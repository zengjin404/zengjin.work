import db from '../_base/_db.js'
import base from '../_base/_base.js'
import curd from '../_base/_crud.js'
// const actions = { ...curd }
const actions = {
	get: {},
	post: {},
}

const fields = 'id,name,code,value,remark,p_id,createtime,updatetime'.split(',')
const valids = 'name,p_id'.split(',')
const joins = [
	{
		table: 'base_dict p',
		on: 'p_id = p.id',
		fields: 'name,code,value,remark,p_id'.split(','),
	},
]

// 查询
actions.get.select = async options => {
	const { table, fields, valids, joins, query, body } = options

	if (!query.p_id && !query.p_code) {
		return base.respFailure({
			msg: '必要参数缺失',
		})
	}

	const wheres = []
	const binds = []
	let bindIndex = 1
	fields.forEach((field, i) => {
		let val = base.formatDbBind(query[field])
		if (val) {
			wheres.push(`${table}.${field} ilike $${bindIndex}`)
			binds.push(`%${base.formatDbBind(query[field])}%`)
			bindIndex++
		}
	})
	if (query.p_id) {
		wheres.push(`${table}.p_id = '${query.p_id}'`)
	}
	if (query.p_code) {
		wheres.push(`${table}.p_id = (SELECT id FROM base_dict WHERE code = '${query.p_code}')`)
	}
	const whereStr = wheres.length ? `where ${wheres.join(' and ')}` : ''

	let fieldStr = `${table}.*`
	let joinStr = ''
	if (joins?.length) {
		joins.forEach((join, i) => {
			const tb = join.table.split(' ').at(-1)
			fieldStr += join.fields.map(field => `, ${tb}.${field} as ${tb}_${field}`).join('')
			joinStr += `left join ${join.table} on ${table}.${join.on} `
		})
	}
	fieldStr += `, (SELECT COUNT(*) FROM base_dict c WHERE c.p_id = ${table}.id) as childcount`

	try {
		const res = await db.query(`select ${fieldStr} from ${table} ${joinStr} ${whereStr} order by ${table}.id`, binds)
		if (res?.rowCount) {
			return base.respSuccess({
				msg: '查询成功',
				data: base.formatDbRows(res.rows),
			})
		}
		return base.respSuccess({
			msg: '查询成功',
			data: [],
		})
	} catch (error) {
		return base.respFailure({
			msg: `查询失败：${error.message}`,
			data: [],
		})
	}
}

// 详情
actions.get.detail = async options => {
	const { table, fields, valids, joins, query, body } = options

	if (!query.id && !query.code) {
		return base.respFailure({
			msg: '必要参数缺失',
		})
	}

	const wheres = []
	if (query.id) {
		wheres.push(`${table}.id = '${query.id}'`)
	}
	if (query.code) {
		wheres.push(`${table}.code = '${query.code}'`)
	}
	const whereStr = wheres.length ? `where ${wheres.join(' and ')}` : ''

	let fieldStr = `${table}.*`
	let joinStr = ''
	if (joins?.length) {
		joins.forEach((join, i) => {
			const tb = join.table.split(' ').at(-1)
			fieldStr += join.fields.map(field => `, ${tb}.${field} as ${tb}_${field}`).join('')
			joinStr += `left join ${join.table} on ${table}.${join.on} `
		})
	}
	fieldStr += `, (SELECT COUNT(*) FROM base_dict c WHERE c.p_id = ${table}.id) as childcount`

	try {
		const res = await db.query(`select ${fieldStr} from ${table} ${joinStr} ${whereStr}`)
		if (res?.rowCount) {
			return base.respSuccess({
				msg: '查询成功',
				data: base.formatDbRows(res.rows)[0],
			})
		}
		return base.respSuccess({
			msg: '查询成功',
			data: {},
		})
	} catch (error) {
		return base.respFailure({
			msg: `查询失败：${error.message}`,
			data: {},
		})
	}
}

// 新增
actions.post.insert = async options => {
	const { table, fields, valids, joins, query, body } = options

	body.id = base.getId()
	body.createtime = base.getTime()

	let checkValidsRes = base.checkValids(body, valids)
	if (checkValidsRes) {
		return base.respFailure({
			msg: `必要字段缺失：${checkValidsRes}`,
		})
	}

	let check = null
	// 校验父级是否存在
	check = await db.query('SELECT * FROM base_dict WHERE id = $1', [body.p_id])
	if (!check?.rowCount) {
		return base.respFailure({
			msg: '父级不存在',
		})
	}
	// 校验同级name是否重复
	check = await db.query('SELECT * FROM base_dict WHERE p_id = $1 AND name = $2', [body.p_id, body.name])
	if (check?.rowCount) {
		return base.respFailure({
			msg: '名称重复',
		})
	}
	if (body.code) {
		// 校验code是否重复
		check = await db.query('SELECT * FROM base_dict WHERE code = $1', [body.code])
		if (check?.rowCount) {
			return base.respFailure({
				msg: 'code 重复',
			})
		}
	}

	const binds = []
	fields.forEach((field, i) => {
		binds.push(base.formatDbBind(body[field]))
	})

	try {
		const res = await db.query(`insert into ${table} (${fields.join(',')}) values (${fields.map((_, i) => `$${i + 1}`).join(',')}) returning id`, binds)
		if (res?.rowCount) {
			return base.respSuccess({
				msg: '新增成功',
				data: body.id,
			})
		}
		throw new Error('未知错误')
	} catch (error) {
		return base.respFailure({
			msg: `新增失败：${error.message}`,
		})
	}
}

// 修改
actions.post.update = async options => {
	const { table, fields, valids, joins, query, body } = options

	if (!body.id) {
		return base.respFailure({
			msg: 'id 参数缺失',
		})
	}
	let ids = body.id.toString().split(',')

	delete body.id
	body.updatetime = base.getTime()

	const updates = []
	const binds = []
	fields.forEach(field => {
		if (body[field] != null) {
			updates.push(`${field} = $${updates.length + 1}`)
			binds.push(base.formatDbBind(body[field]))
		}
	})
	if (!updates.length) {
		return base.respFailure({
			msg: '字段无效',
		})
	}

	try {
		const successIds = []
		for (const id of ids) {
			let check = null
			// 校验父级是否存在
			check = await db.query('SELECT * FROM base_dict WHERE id = $1', [body.p_id])
			if (!check?.rowCount) {
				console.log(1)
				continue
			}

			// 校验同级name是否重复
			check = await db.query('SELECT * FROM base_dict WHERE id != $1 AND p_id = $2 AND name = $3', [id, body.p_id, body.name])
			if (check?.rowCount) {
				console.log(2)
				continue
			}
			if (body.code) {
				// 校验code是否重复
				check = await db.query('SELECT * FROM base_dict WHERE id != $1 AND code = $2', [id, body.code])
				if (check?.rowCount) {
					console.log(3)
					continue
				}
			}

			const res = await db.query(
				`update ${table} set ${updates.map((update, i) => update.replace('?', `$${i + 1}`)).join(', ')} where id = $${updates.length + 1}`,
				[...binds, id],
			)
			if (res?.rowCount) {
				successIds.push(id)
			}
		}
		if (successIds.length == ids.length) {
			return base.respSuccess({
				msg: `编辑成功`,
				data: successIds.join(','),
			})
		}
		if (successIds.length) {
			return base.respSuccess({
				msg: `编辑成功 ${successIds.length} 条，失败 ${ids.length - successIds.length} 条`,
				data: successIds.join(','),
			})
		}
		throw new Error('未知错误')
	} catch (error) {
		return base.respFailure({
			msg: `编辑失败：${error.message}`,
		})
	}
}

// 删除
actions.post.delete = async options => {
	const { table, fields, valids, joins, query, body } = options

	if (!body.id) {
		return base.respFailure({
			msg: 'id 参数缺失',
		})
	}
	let ids = body.id.toString().split(',')

	try {
		const successIds = []
		for (const id of ids) {
			let res = await deleteWithChildren(id)
			if (res) {
				successIds.push(id)
			}
		}
		if (successIds.length == ids.length) {
			return base.respSuccess({
				msg: `删除成功`,
				data: successIds.join(','),
			})
		}
		if (successIds.length) {
			return base.respSuccess({
				msg: `删除成功 ${successIds.length} 条，失败 ${ids.length - successIds.length} 条`,
				data: successIds.join(','),
			})
		}
		throw new Error('未知错误')
	} catch (error) {
		return base.respFailure({
			msg: `删除失败：${error.message}`,
		})
	}

	// 删除自身及子孙数据
	async function deleteWithChildren(id) {
		try {
			// 查询子级
			const children = await db.query('SELECT id FROM base_dict WHERE p_id = $1', [id])
			if (children?.rowCount) {
				for (const child of children.rows) {
					await deleteWithChildren(child.id)
				}
			}
			// 删除自身
			const res = await db.query(`delete from ${table} where id = $1`, [id])
			// sql执行完成(包括找不到数据)即算成功
			if (res?.rowCount != null) {
				return true
			}
			throw new Error('未知错误')
		} catch (error) {
			return false
		}
	}
}

export default async (req, resp) => {
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
