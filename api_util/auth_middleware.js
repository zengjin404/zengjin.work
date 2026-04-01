import { verifyAccessToken } from './jwt.js'

/**
 * 认证中间件
 * 用于保护需要登录才能访问的API接口
 */

/**
 * 要求认证的中间件包装器
 * @param {Function} handler - 实际的处理函数
 * @returns {Function} 包装后的处理函数
 */
export async function checkAuth(req, resp) {
	try {
		// 从请求头获取token
		const authHeader = req.headers.authorization || req.headers.Authorization

		if (!authHeader) {
			resp.status(401).json({ code: -1, msg: '未提供认证令牌' })
			return false
		}

		// 检查Bearer格式
		const parts = authHeader.split(' ')
		if (parts.length !== 2 || parts[0] !== 'Bearer') {
			resp.status(401).json({ code: -1, msg: '认证令牌格式错误' })
			return false
		}

		const token = parts[1]

		// 验证token
		let decoded
		try {
			decoded = verifyAccessToken(token)
		} catch (error) {
			resp.status(401).json({ code: -1, msg: error.message || '认证令牌无效' })
			return false
		}

		// 将用户信息附加到请求对象，以便后续业务使用
		req.user = {
			userId: decoded.userId,
			username: decoded.username,
		}

		// 验证成功，放行
		return true

	} catch (error) {
		console.error('认证过程发生异常:', error)
		resp.status(500).json({ code: -1, msg: '服务器内部错误' })
		return false
	}
}
