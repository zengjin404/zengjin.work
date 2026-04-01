import createDbAdmin from '#api_util/db_admin.js'
import base from '#api_util/base.js'
import { decryptPassword, encryptPassword, hashToken } from '#api_util/crypto.js'
import { generateAccessToken, generateRefreshToken } from '#api_util/jwt.js'
import { requireAuth } from '#api_util/auth_middleware.js'

/**
 * 用户及身份认证相关接口
 * GET  /api/base/user/me
 * POST /api/base/user/login
 * POST /api/base/user/logout
 * POST /api/base/user/refresh
 * POST /api/base/user/update_password
 */
const actions = {
	get: {
		/**
		 * 获取当前用户信息
		 */
		me: requireAuth(async ({ req }) => {
			const { userId } = req.user
			const db = createDbAdmin()

			const { data: users, error } = await db.from('base_user').select('id, username, phone, nickname').eq('id', userId).limit(1)

			if (error || !users || users.length === 0) {
				return base.respFailure({ msg: '用户不存在或获取失败' })
			}

			return base.respSuccess({
				msg: '获取成功',
				data: users[0],
			})
		}),
	},

	post: {
		/**
		 * 登录
		 */
		login: async ({ req, resp, body }) => {
			const { username, password } = body

			const invalids = base.checkValids(body, ['username', 'password'])
			if (invalids) {
				return base.respFailure({ msg: `缺少必填参数: ${invalids}` })
			}

			const db = createDbAdmin()
			const { data: users, error: queryError } = await db
				.from('base_user')
				.select('id, username, password, phone, nickname')
				.eq('username', username)
				.limit(1)

			if (queryError || !users || users.length === 0) {
				return base.respFailure({ msg: '用户名或密码错误' })
			}

			const user = users[0]
			let dbPassword
			try {
				dbPassword = decryptPassword(user.password)
			} catch (error) {
				return base.respFailure({ msg: '系统错误' })
			}

			if (dbPassword !== password) {
				return base.respFailure({ msg: '用户名或密码错误' })
			}

			const accessToken = generateAccessToken({ userId: user.id, username: user.username })
			const refreshToken = generateRefreshToken()
			const tokenHash = hashToken(refreshToken)

			const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
			const userAgent = req.headers['user-agent'] || ''
			const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''

			await db.from('base_user_session').insert({
				user_id: user.id,
				refresh_token_hash: tokenHash,
				expires_at: expiresAt.toISOString(),
				user_agent: userAgent,
				ip_address: ipAddress,
			})

			const isProd = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'
			const cookieOptions = [
				`refreshToken=${refreshToken}`,
				'HttpOnly',
				'Path=/',
				`Max-Age=${7 * 24 * 60 * 60}`,
				isProd ? 'SameSite=None; Secure' : 'SameSite=Lax',
			].join('; ')
			resp.setHeader('Set-Cookie', cookieOptions)

			return base.respSuccess({
				msg: '登录成功',
				data: {
					token: accessToken,
					info: { id: user.id, username: user.username, phone: user.phone, nickname: user.nickname },
				},
			})
		},

		/**
		 * 退出登录
		 */
		logout: async ({ req, resp }) => {
			const cookies = req.headers.cookie || ''
			const refreshToken = cookies
				.split(';')
				.find(c => c.trim().startsWith('refreshToken='))
				?.split('=')[1]

			if (refreshToken) {
				const tokenHash = hashToken(refreshToken)
				const db = createDbAdmin()
				await db.from('base_user_session').update({ revoked_at: new Date().toISOString() }).eq('refresh_token_hash', tokenHash)
			}

			resp.setHeader('Set-Cookie', 'refreshToken=; HttpOnly; Path=/; Max-Age=0')
			return base.respSuccess({ msg: '退出成功' })
		},

		/**
		 * 刷新Token
		 */
		refresh: async ({ req, resp }) => {
			const cookies = req.headers.cookie || ''
			const refreshToken = cookies
				.split(';')
				.find(c => c.trim().startsWith('refreshToken='))
				?.split('=')[1]

			if (!refreshToken) return resp.status(401).json({ code: -1, msg: '未提供刷新令牌' })

			const tokenHash = hashToken(refreshToken)
			const db = createDbAdmin()
			const { data: sessions, error: queryError } = await db
				.from('base_user_session')
				.select('id, user_id, expires_at, revoked_at')
				.eq('refresh_token_hash', tokenHash)
				.limit(1)

			if (queryError || !sessions || sessions.length === 0 || sessions[0].revoked_at || new Date(sessions[0].expires_at) < new Date()) {
				return resp.status(401).json({ code: -1, msg: '刷新令牌无效或已过期' })
			}

			const session = sessions[0]
			const { data: users, error: userError } = await db.from('base_user').select('id, username').eq('id', session.user_id).limit(1)

			if (userError || !users || users.length === 0) return resp.status(401).json({ code: -1, msg: '用户不存在' })

			const user = users[0]
			await db.from('base_user_session').update({ revoked_at: new Date().toISOString() }).eq('id', session.id)

			const newAccessToken = generateAccessToken({ userId: user.id, username: user.username })
			const newRefreshToken = generateRefreshToken()
			const newTokenHash = hashToken(newRefreshToken)

			const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
			await db.from('base_user_session').insert({
				user_id: user.id,
				refresh_token_hash: newTokenHash,
				expires_at: expiresAt.toISOString(),
				user_agent: req.headers['user-agent'] || '',
				ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
			})

			const isProd = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'
			const cookieOptions = [
				`refreshToken=${newRefreshToken}`,
				'HttpOnly',
				'Path=/',
				`Max-Age=${7 * 24 * 60 * 60}`,
				isProd ? 'SameSite=None; Secure' : 'SameSite=Lax',
			].join('; ')
			resp.setHeader('Set-Cookie', cookieOptions)

			return base.respSuccess({ msg: '刷新成功', data: { token: newAccessToken } })
		},

		/**
		 * 修改密码
		 */
		update_password: requireAuth(async ({ req, body }) => {
			const { passwordOld, passwordNew } = body
			const { userId } = req.user

			// 校验参数
			const invalids = base.checkValids(body, ['passwordOld', 'passwordNew'])
			if (invalids) {
				return base.respFailure({ msg: `缺少必填参数: ${invalids}` })
			}

			const db = createDbAdmin()
			const { data: users, error: queryError } = await db.from('base_user').select('password').eq('id', userId).limit(1)

			if (queryError || !users || users.length === 0) {
				return base.respFailure({ msg: '用户不存在' })
			}

			const user = users[0]
			let dbPassword
			try {
				dbPassword = decryptPassword(user.password)
			} catch (error) {
				return base.respFailure({ msg: '系统解密错误' })
			}

			if (dbPassword !== passwordOld) {
				return base.respFailure({ msg: '原密码错误' })
			}

			// 更新密码
			const encryptedNewPassword = encryptPassword(passwordNew)
			const { error: updateError } = await db.from('base_user').update({ password: encryptedNewPassword }).eq('id', userId)

			if (updateError) {
				console.error('更新密码失败:', updateError)
				return base.respFailure({ msg: '修改密码失败，请稍后重试' })
			}

			// 修改成功后作废该用户所有的 Session
			await db.from('base_user_session').update({ revoked_at: new Date().toISOString() }).eq('user_id', userId).is('revoked_at', null)

			return base.respSuccess({ msg: '密码修改成功' })
		}),
	},
}

export default async (req, resp) => {
	base.req = req
	base.resp = resp
	const { method, action, body, query } = base.getReqInfo()

	try {
		if (actions[method]?.[action]) {
			const handler = actions[method][action]
			// 这里的handler如果是由requireAuth包装的，它内部会自行处理校验和返回
			return await handler({ req, resp, body, query })
		}
		return base.respFailure({ msg: '无效的操作' })
	} catch (error) {
		console.error('接口处理错误:', error)
		return base.respFailure({ msg: `服务器内部错误: ${error.message}` })
	}
}
