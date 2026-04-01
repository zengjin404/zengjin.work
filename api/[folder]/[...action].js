import demoHandler from '../_demo.js'
import noteHandler from '../_note.js'
import classHandler from '../_zone/mzl/class.js'
import studentHandler from '../_zone/mzl/student.js'

export default async (req, res) => {
	// 在 Vercel 特解架构 [folder]/[...action].js 下：
	// 例 1：/api/demo/hello -> folder 是 'demo', action 是 ['hello']
	// 例 2：/api/note/select -> folder 是 'note', action 是 ['select']
	const targetModule = req.query.folder 

	// 获取 Vercel 传递的原始捕获数组（兼容处理 ...action 这种诡异的 CLI Bug 字段）
	let rawAction = req.query.action || req.query['...action'] || []

	console.log('rawAction', rawAction);
	
	if (typeof rawAction === 'string') {
		rawAction = rawAction.split('/')
	}
	
	// 为了完美兼容底层的 _demo.js 和 _note.js 对数组长度截取的逻辑
	// 我们手动补齐完整路径数组，使其表现得像之前的根目录捕获 ['demo', 'hello']
	console.log('targetModule', targetModule);
	console.log('rawAction', rawAction);
	
	const fullAction = [targetModule].concat(rawAction)
	req.query.action = fullAction

	try {
		switch (targetModule) {
			case 'note':
				return await noteHandler(req, res)
			
			case 'demo':
				return await demoHandler(req, res)

			case 'zone':
				// 对于 zone 模块，URL 为 /api/zone/mzl/class/select
				// 此时 fullAction 为 ['zone', 'mzl', 'class', 'select']
				console.log('fullAction', fullAction);
				
				const zoneName = fullAction[1] // 'mzl'
				const entity = fullAction[2] // 'class' 或 'student'

				if (zoneName === 'mzl') {
					if (entity === 'class') {
						return await classHandler(req, res)
					} else if (entity === 'student') {
						return await studentHandler(req, res)
					}
				}
				// 若不是已知实体，返回404
				return res.status(404).json({ error: `zone 开发区网关拦截: 未识别或未挂载的接口模块 '${zoneName}/${entity}'` })

			default:
				return res.status(404).json({ error: `总路由架构降级拦截: 未知系统级模块 '${targetModule || '空'}'`, path: req.url })
		}
	} catch (error) {
		return res.status(500).json({ error: 'Vercel 本地路由模拟分发环境崩溃', details: error.message })
	}
}
