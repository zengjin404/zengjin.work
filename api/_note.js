import base from '#api_util/base.js'
import crud from '#api_util/crud.js'
const actions = { ...crud }

const fields = 'id,user_id,title,abstract,content,img,createtime,updatetime,toptime'.split(',')
const valids = 'title,abstract,content'.split(',')
const joins = {}

// 不再受 Vercel 直接接管，此时这个文件只是一个普通的模块控制器
export default async (req, resp) => {
	base.req = req
	base.resp = resp
	// `base.getReqInfo()` 依然能完美工作，因为 `req.url` 会原封不动透传过来
	// 例如：/api/note/select
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

/** 
 * (Swagger 注释内容已保留，实际项目无需因文件位移重写)
 */
