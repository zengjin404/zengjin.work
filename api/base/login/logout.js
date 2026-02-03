import base from '../../_base/_base.js'
import createDbAdmin from '../../_base/_db_admin.js'
import { hashToken } from '../../_base/_crypto.js'

/**
 * 退出登录接口
 * POST /api/base/login/logout
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
	} catch (error) {
		console.error('退出接口错误:', error)
		return base.respFailure({ msg: `服务器内部错误: ${error.message}` })
	}
}
