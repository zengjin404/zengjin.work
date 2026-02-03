import base from '../../_base/_base.js'
import createDbAdmin from '../../_base/_db_admin.js'
import { decryptPassword } from '../../_base/_crypto.js'
import { generateAccessToken, generateRefreshToken } from '../../_base/_jwt.js'
import { hashToken } from '../../_base/_crypto.js'

/**
 * 登录接口
 * POST /api/base/login/login
 */
export default async (req, resp) => {
	base.req = req
	base.resp = resp

	const { method, body } = base.getReqInfo()

	// 仅支持POST
	if (method !== 'post') {
		return base.respFailure({ msg: '仅支持 POST 方法' })
	}

	const { username, password } = body

	// 参数校验
	const invalids = base.checkValids(body, ['username', 'password'])
	if (invalids) {
		return base.respFailure({ msg: `缺少必填参数: ${invalids}` })
	}

	try {
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

		// 返回用户信息和access token（不返回密码）
		const userInfo = {
			id: user.id,
			username: user.username,
			phone: user.phone,
			nickname: user.nickname,
		}

		return base.respSuccess({
			msg: '登录成功',
			data: {
				accessToken,
				user: userInfo,
			},
		})
	} catch (error) {
		console.error('登录接口错误:', error)
		return base.respFailure({ msg: `服务器内部错误: ${error.message}` })
	}
}
