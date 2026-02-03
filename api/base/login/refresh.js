import base from '../../_base/_base.js'
import createDbAdmin from '../../_base/_db_admin.js'
import { generateAccessToken, generateRefreshToken } from '../../_base/_jwt.js'
import { hashToken } from '../../_base/_crypto.js'

/**
 * 刷新Token接口
 * POST /api/base/login/refresh
 */
export default async (req, resp) => {
	base.req = req
	base.resp = resp

	const { method } = base.getReqInfo()

	// 仅支持POST
	if (method !== 'post') {
		return base.respFailure({ msg: '仅支持 POST 方法' })
	}

	try {
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
		const { data: sessions, error: queryError } = await db.from('base_user_session').select('id, user_id, expires_at, revoked_at').eq('refresh_token_hash', tokenHash).limit(1)

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
		const cookieOptions = [`refreshToken=${newRefreshToken}`, 'HttpOnly', 'Path=/', `Max-Age=${7 * 24 * 60 * 60}`, isProd ? 'SameSite=None; Secure' : 'SameSite=Lax'].join('; ')

		resp.setHeader('Set-Cookie', cookieOptions)

		return base.respSuccess({
			msg: '刷新成功',
			data: {
				accessToken: newAccessToken,
			},
		})
	} catch (error) {
		console.error('刷新接口错误:', error)
		return resp.status(500).json({
			code: -1,
			msg: `服务器内部错误: ${error.message}`,
		})
	}
}
