import base from '#api_util/base.js'
import createDbAdmin from '#api_util/db_admin.js'
import { decryptPassword, hashToken } from '#api_util/crypto.js'
import { generateAccessToken, generateRefreshToken } from '#api_util/jwt.js'

/**
 * 身份认证相关接口
 * POST /api/base/login/login
 * POST /api/base/login/logout
 * POST /api/base/login/refresh
 */
const actions = {
	post: {
		/**
		 * 登录
		 */
		login: async ({ req, resp, body }) => {
			const { username, password } = body

			// 参数校验
			const invalids = base.checkValids(body, ['username', 'password'])
			if (invalids) {
				return base.respFailure({ msg: `缺少必填参数: ${invalids}` })
			}

			const db = createDbAdmin()

			// 查询用户
			const { data: users, error: queryError } = await db.from('base_user').select('id, username, password, phone, nickname').eq('username', username).limit(1)

			if (queryError) {
				console.error('查询用户失败:', queryError)
				return base.respFailure({ msg: '登录失败，请稍后重试' })
			}

			if (!users || users.length === 0) {
				return base.respFailure({ msg: '用户名或密码错误' })
			}

			const user = users[0]

			// 解密数据库中的密码并比对
			let dbPassword
			try {
				dbPassword = decryptPassword(user.password)
			} catch (error) {
				console.error('密码解密失败:', error)
				return base.respFailure({ msg: '系统错误，请联系管理员' })
			}

			if (dbPassword !== password) {
				return base.respFailure({ msg: '用户名或密码错误' })
			}

			// 生成tokens
			const accessToken = generateAccessToken({
				userId: user.id,
				username: user.username,
			})
			const refreshToken = generateRefreshToken()
			const tokenHash = hashToken(refreshToken)

			// 创建session记录
			const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7天后
			const userAgent = req.headers['user-agent'] || ''
			const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''

			const { error: insertError } = await db.from('base_user_session').insert({
				user_id: user.id,
				refresh_token_hash: tokenHash,
				expires_at: expiresAt.toISOString(),
				user_agent: userAgent,
				ip_address: ipAddress,
			})

			if (insertError) {
				console.error('创建会话失败:', insertError)
				return base.respFailure({ msg: '登录失败，请稍后重试' })
			}

			// 判断环境
			const isProd = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'

			// 设置refresh token cookie
			const cookieOptions = [
				`refreshToken=${refreshToken}`,
				'HttpOnly',
				'Path=/',
				`Max-Age=${7 * 24 * 60 * 60}`, // 7天
				isProd ? 'SameSite=None; Secure' : 'SameSite=Lax',
			].join('; ')

			resp.setHeader('Set-Cookie', cookieOptions)

			// 返回用户信息和access token
			const userInfo = {
				id: user.id,
				username: user.username,
				phone: user.phone,
				nickname: user.nickname,
			}

			return base.respSuccess({
				msg: '登录成功',
				data: {
					token: accessToken,
					info: userInfo,
				},
			})
		},

		/**
		 * 退出登录
		 */
		logout: async ({ req, resp }) => {
			// 从cookie获取refresh token
			const cookies = req.headers.cookie || ''
			const refreshToken = cookies
				.split(';')
				.find(c => c.trim().startsWith('refreshToken='))
				?.split('=')[1]

			if (refreshToken) {
				const tokenHash = hashToken(refreshToken)
				const db = createDbAdmin()

				// 撤销session
				const { error } = await db.from('base_user_session').update({ revoked_at: new Date().toISOString() }).eq('refresh_token_hash', tokenHash)

				if (error) {
					console.error('撤销会话失败:', error)
				}
			}

			// 清除cookie
			resp.setHeader('Set-Cookie', 'refreshToken=; HttpOnly; Path=/; Max-Age=0')

			return base.respSuccess({
				msg: '退出成功',
			})
		},

		/**
		 * 刷新Token
		 */
		refresh: async ({ req, resp }) => {
			// 从cookie获取refresh token
			const cookies = req.headers.cookie || ''
			const refreshToken = cookies
				.split(';')
				.find(c => c.trim().startsWith('refreshToken='))
				?.split('=')[1]

			if (!refreshToken) {
				return resp.status(401).json({
					code: -1,
					msg: '未提供刷新令牌',
				})
			}

			const tokenHash = hashToken(refreshToken)
			const db = createDbAdmin()

			// 查询session
			const { data: sessions, error: queryError } = await db
				.from('base_user_session')
				.select('id, user_id, expires_at, revoked_at')
				.eq('refresh_token_hash', tokenHash)
				.limit(1)

			if (queryError) {
				console.error('查询会话失败:', queryError)
				return resp.status(401).json({
					code: -1,
					msg: '刷新令牌无效',
				})
			}

			if (!sessions || sessions.length === 0) {
				return resp.status(401).json({
					code: -1,
					msg: '刷新令牌不存在',
				})
			}

			const session = sessions[0]

			// 检查是否已撤销
			if (session.revoked_at) {
				return resp.status(401).json({
					code: -1,
					msg: '刷新令牌已失效',
				})
			}

			// 检查是否过期
			if (new Date(session.expires_at) < new Date()) {
				return resp.status(401).json({
					code: -1,
					msg: '刷新令牌已过期',
				})
			}

			// 查询用户信息
			const { data: users, error: userError } = await db.from('base_user').select('id, username').eq('id', session.user_id).limit(1)

			if (userError || !users || users.length === 0) {
				console.error('查询用户失败:', userError)
				return resp.status(401).json({
					code: -1,
					msg: '用户不存在',
				})
			}

			const user = users[0]

			// 撤销旧session
			const { error: revokeError } = await db.from('base_user_session').update({ revoked_at: new Date().toISOString() }).eq('id', session.id)

			if (revokeError) {
				console.error('撤销旧会话失败:', revokeError)
			}

			// 生成新tokens
			const newAccessToken = generateAccessToken({
				userId: user.id,
				username: user.username,
			})
			const newRefreshToken = generateRefreshToken()
			const newTokenHash = hashToken(newRefreshToken)

			// 创建新session
			const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
			const userAgent = req.headers['user-agent'] || ''
			const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''

			const { error: insertError } = await db.from('base_user_session').insert({
				user_id: user.id,
				refresh_token_hash: newTokenHash,
				expires_at: expiresAt.toISOString(),
				user_agent: userAgent,
				ip_address: ipAddress,
			})

			if (insertError) {
				console.error('创建新会话失败:', insertError)
				return resp.status(500).json({
					code: -1,
					msg: '刷新失败，请重新登录',
				})
			}

			// 判断环境
			const isProd = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'

			// 设置新的refresh token cookie
			const cookieOptions = [`refreshToken=${newRefreshToken}`, 'HttpOnly', 'Path=/', `Max-Age=${7 * 24 * 60 * 60}`, isProd ? 'SameSite=None; Secure' : 'SameSite=Lax'].join(
				'; ',
			)

			resp.setHeader('Set-Cookie', cookieOptions)

			return base.respSuccess({
				msg: '刷新成功',
				data: {
					token: newAccessToken,
				},
			})
		},
	},
}

export default async (req, resp) => {
	base.req = req
	base.resp = resp
	const { method, action, body, query } = base.getReqInfo()

	try {
		if (actions[method]?.[action]) {
			return await actions[method][action]({ req, resp, body, query })
		}
		return base.respFailure({ msg: '无效的操作' })
	} catch (error) {
		console.error('接口处理错误:', error)
		return base.respFailure({ msg: `服务器内部错误: ${error.message}` })
	}
}
