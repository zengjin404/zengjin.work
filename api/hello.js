module.exports = {
	default: function handler(req, res) {
		const { method } = req
		// 从请求路径中获取操作类型
		// const operation = req.url.split('/').pop()

		try {
			// switch (operation) {
			//   case 'select':
			return res.status(200).json({
				message: 'Hello World!',
				timestamp: new Date().toISOString(),
			})
			//   default:
			//     return res.status(400).json({ error: '无效的操作类型' });
			// }
		} catch (error) {
			console.error('数据库操作错误:', error)
			return res.status(500).json({ error: '服务器内部错误' })
		}
	},
}
