import { verifyAccessToken } from './_jwt.js'

/**
 * 认证中间件
 * 用于保护需要登录才能访问的API接口
 */

/**
 * 要求认证的中间件包装器
 * @param {Function} handler - 实际的处理函数
 * @returns {Function} 包装后的处理函数
 */
export function requireAuth(handler) {
	return async (req, resp) => {
		try {
			// 从请求头获取token
			const authHeader = req.headers.authorization || req.headers.Authorization

			if (!authHeader) {
				return resp.status(401).json({
					code: -1,
					msg: '未提供认证令牌',
				})
			}

			// 检查Bearer格式
			const parts = authHeader.split(' ')
			if (parts.length !== 2 || parts[0] !== 'Bearer') {
				return resp.status(401).json({
					code: -1,
					msg: '认证令牌格式错误',
				})
			}

			const token = parts[1]

			// 验证token
			let decoded
			try {
				decoded = verifyAccessToken(token)
			} catch (error) {
				return resp.status(401).json({
					code: -1,
					msg: error.message || '认证令牌无效',
				})
			}

			// 将用户信息附加到请求对象
			req.user = {
				userId: decoded.userId,
				username: decoded.username,
			}

			// 调用实际的处理函数
			return await handler(req, resp)
		} catch (error) {
			console.error('认证中间件错误:', error)
			return resp.status(500).json({
				code: -1,
				msg: '服务器内部错误',
			})
		}
	}
}
