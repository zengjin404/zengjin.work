import base from '../../_base/_base.js'

/**
 * sayhello 方法：返回 Hello 消息
 * 仅用于演示动态路由 [action].js 的方法分发
 */
async function sayhello() {
	// 可使用 base.getTime() 等工具函数保证风格一致
	const now = base.getTime()
	return base.respSuccess({
		msg: 'ok',
		data: {
			type: 'sayhello',
			message: 'Hello from /api/base/demo/sayhello',
			time: now,
		},
	})
}

/**
 * sayhi 方法：返回 Hi 消息
 * 仅用于演示动态路由 [action].js 的方法分发
 */
async function sayhi() {
	const now = base.getTime()
	return base.respSuccess({
		msg: 'ok',
		data: {
			type: 'sayhi',
			message: 'Hi from /api/base/demo/sayhi',
			time: now,
		},
	})
}

/**
 * API 入口（动态路由版）：
 * - 文件名为 [action].js，Vercel 会将路径 /api/base/demo/:action 映射到此文件
 * - 本实现仍复用 base.getReqInfo() 解析 action，以与现有风格保持一致
 * - 仅支持 GET
 */
export default async (req, resp) => {
	base.req = req
	base.resp = resp

	const { method, action } = base.getReqInfo()

	// 仅 GET
	if (method !== 'get') {
		return base.respFailure({ msg: '仅支持 GET 方法' })
	}

	// 分发到对应方法（同一文件内聚合多个接口）
	try {
		switch (action) {
			case 'sayhello':
				return await sayhello()
			case 'sayhi':
				return await sayhi()
			default:
				return base.respFailure({ msg: '未找到对应方法' })
		}
	} catch (error) {
		return base.respFailure({ msg: `服务器内部错误: ${error.message}` })
	}
}
