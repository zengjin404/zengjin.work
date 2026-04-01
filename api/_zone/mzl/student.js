import base from '#api_util/base.js'
import curd from '#api_util/crud.js'
import { checkAuth } from '#api_util/auth_middleware.js'

const actions = { ...curd }

const fields = 'id,name,sex,age,address,createtime,updatetime,class_id'.split(',')
const valids = 'name,sex'.split(',')
const joins = [
	{
		table: 'zone_mzl_class class',
		on: 'class_id = class.id',
		fields: 'name,leader,slogan'.split(','),
	},
]

export default async (req, resp) => {
	// 鉴权防护
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
			msg: `服务器内部错误: ${error.message}`,
		})
	}
}
