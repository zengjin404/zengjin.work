import dayjs from 'dayjs'

const base = {}

// // 设置CORS头
// base.corsHeaders = {
// 	'Access-Control-Allow-Origin': '*', // 允许所有域，可替换为具体域名
// 	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // 允许的HTTP方法
// 	'Access-Control-Allow-Headers': 'Content-Type, Authorization', // 允许的请求头
// 	'Access-Control-Max-Age': '86400', // 预检请求缓存时间（24小时）
// }

// 获取请求信息
base.getReqInfo = () => {
	let paths = new URL(`https://host${base.req.url}`).pathname.split('/').filter(Boolean)
	return {
		method: base.req.method.toLowerCase(),
		action: paths.pop() || '',
		table: paths.filter((item, i) => !(i == 0 && item == 'api')).join('_') || '',
		query: base.req.query,
		body: base.req.body,
	}
}

// 通用成功响应
base.respSuccess = (res = {}) => base.resp.status(200).json({ code: 0, msg: res.msg || '操作成功', ...res })

// 通用失败响应
base.respFailure = (res = {}) => base.resp.status(200).json({ code: -1, msg: res.msg || '操作失败', ...res })

// 生成id
// 12位id = 9位(毫秒时间戳转36进制) + 3位(特定随机数转36进制)
// 前9位范围为 100000000 ~ zzzzzzzzz,  对应10进制时间戳 282110990745(6) ~ 10155995666841(5), 即 1978-12-10 12:09:50.745(.6) ~ 2291-10-31 13:54:26.841(.5)
// 后3位范围为 000 ~ zzz, 对应10进制 0 ~ 46655
base.getId = () => {
	let id = ''
	id += Math.round((performance.now() + performance.timeOrigin) * 10).toString(36)
	id += Math.floor(Math.random() * (46655 + 1))
		.toString(36)
		.padStart(3, '0')
	return id
}

// 生成格式化日期时间, 默认当前
base.getTime = time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')

// // 格式化输出可执行的sql语句(mysql)
// base.formatSql = (sql, binds) => {
// 	return binds.reduce((acc, val) => {
// 		if (typeof val === 'string') {
// 			return acc.replace('?', `'${val.replace(/'/g, "''")}'`)
// 		}
// 		return acc.replace('?', val)
// 	}, sql)
// }

// 格式化输出可执行的sql语句(pg)
base.formatSql = (sql, binds) => {
	return binds.reduce((acc, val, index) => {
		if (typeof val === 'string') {
			return acc.replace(`$${index + 1}`, `'${val.replace(/'/g, "''")}'`)
		}
		return acc.replace(`$${index + 1}`, val)
	}, sql)
}

// 必填项校验 (入参[对象], 必填字段[数组]), 返回不符合的参数名[逗号分隔字符串]
base.checkValids = (body, valids) => {
	return valids
		.filter(field => {
			const val = body[field]
			if (val == null || Number.isNaN(val)) return true // 快速处理null/undefined/NaN
			switch (Object.prototype.toString.call(val)) {
				case '[object String]':
					return !val.trim() // 检查空字符串
				case '[object Array]':
					return !val.length // 检查空数组
				case '[object Object]':
					return !Object.keys(val).length // 检查空对象
				default:
					return false // 其他默认通过
			}
		})
		.join(',')
}

// 入库数据格式化
base.formatDbBind = val => {
	if (val == null || Number.isNaN(val)) return '' // 快速处理null/undefined/NaN
	if (typeof val == 'object') return JSON.stringify(val) // 对象/数组
	return String(val).trim() // 其他默认转字符串
}

// 出库数据可视化
base.formatDbRows = rows => {
	return rows.map(row => {
		Object.entries(row).forEach(([key, val]) => {
			if (val == null || Number.isNaN(val)) {
				row[key] = '' // 快速处理null/undefined/NaN
				return
			}
			if (typeof val == 'string') {
				// 尝试解析 JSON
				if (/^[\[{].*[\]}]$/.test(val)) {
					try {
						row[key] = JSON.parse(val)
						return
					} catch {}
				}
				// 尝试转换纯数字
				if (/^\d+$/.test(val)) {
					row[key] = Number(val)
				}
			}
		})
		return row
	})
}
export default base
