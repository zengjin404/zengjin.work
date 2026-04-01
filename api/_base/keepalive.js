import base from '#api_util/base.js'
import curd from '#api_util/crud.js'
import db from '#api_util/db.js'
const actions = { ...curd }

const fields = 'id,target,createtime'.split(',')
const valids = []
const joins = {}

actions.get.supabase = async options => {
	const { table, fields, valids, joins, query, body, action } = options

	query.id = base.getId()
	query.createtime = base.getTime()
	query.target = action

	const binds = []
	fields.forEach((field, i) => {
		binds.push(base.formatDbBind(query[field]))
	})

	try {
		// 插入记录（轻量化：无额外业务逻辑）
		const resInsert = await db.query(`insert into ${table} (${fields.join(',')}) values (${fields.map((_, i) => `$${i + 1}`).join(',')}) returning id`, binds)
		if (!resInsert?.rowCount) {
			throw new Error('插入返回为空')
		}

		// 查询该条记录以确认写入成功
		const resSelect = await db.query(`select * from ${table} where id = $1`, [query.id])
		if (!resSelect?.rowCount) {
			throw new Error('查询返回为空')
		}

		return base.respSuccess({
			msg: 'supabase数据库保活执行成功',
			data: base.formatDbRows(resSelect.rows)[0],
		})
	} catch (error) {
		return base.respFailure({
			msg: `supabase数据库保活执行失败：${error.message}`,
		})
	}
}

export default async (req, resp) => {
	base.req = req
	base.resp = resp

	const { table, method, action, query, body } = base.getReqInfo()

	try {
		if (actions[method]?.[action]) {
			return await actions[method][action]({ table, fields, valids, joins, query, body, action })
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
