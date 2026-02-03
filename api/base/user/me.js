import createDbAdmin from '../../_base/_db_admin.js'
import base from '../../_base/_base.js'
import { requireAuth } from '../../_base/_auth_middleware.js'

/**
 * 获取当前用户信息接口
 * GET /api/base/user/me
 */
async function handler(req, resp) {
	base.req = req
	base.resp = resp

	try {
		const { userId } = req.user
		const db = createDbAdmin()

		// 查询用户信息
		const { data: users, error } = await db.from('base_user').select('id, username, phone, nickname').eq('id', userId).limit(1)

		if (error) {
			console.error('查询用户失败:', error)
			return base.respFailure({ msg: '获取用户信息失败' })
		}

		if (!users || users.length === 0) {
			return base.respFailure({ msg: '用户不存在' })
		}

		return base.respSuccess({
			msg: '获取成功',
			data: users[0],
		})
	} catch (error) {
		console.error('获取用户信息错误:', error)
		return base.respFailure({ msg: `服务器内部错误: ${error.message}` })
	}
}

export default requireAuth(handler)
