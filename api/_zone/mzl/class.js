import base from '#api_util/base.js'
import curd from '#api_util/crud.js'
import { checkAuth } from '#api_util/auth_middleware.js'

const actions = { ...curd }

const fields = 'id,name,leader,slogan,createtime'.split(',')
const valids = 'name,leader'.split(',')
const joins = {}

export default async (req, resp) => {
	// 使用新架构的布尔拦截器
	if (!(await checkAuth(req, resp))) return

	base.req = req
	base.resp = resp
	const { table, method, action, query, body } = base.getReqInfo()

	try {
		if (actions[method]?.[action]) {
			return await actions[method][action]({ table, fields, valids, joins, query, body })
		} else {
			return base.respFailure({
				msg: '请求类型或方法无效',
			})
		}
	} catch (error) {
		return base.respFailure({
			msg: '服务器内部错误',
			...error,
		})
	}
}
