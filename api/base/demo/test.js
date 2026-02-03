import base from '../../_base/_base.js'
import { requireAuth } from '../../_base/_auth_middleware.js'

/**
 * 受保护的测试接口
 * GET /api/base/demo/test
 */
async function handler(req, resp) {
	base.req = req
	base.resp = resp

	try {
		const { userId, username } = req.user

		return base.respSuccess({
			msg: 'ok',
			data: {
				message: '这是一个受保护的接口，只有登录用户才能访问',
				user: {
					userId,
					username,
				},
				time: base.getTime(),
				random: Math.random(),
			},
		})
	} catch (error) {
		console.error('测试接口错误:', error)
		return base.respFailure({ msg: `服务器内部错误: ${error.message}` })
	}
}

export default requireAuth(handler)
