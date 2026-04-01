import base from '#api_util/base.js'
// import tencentcloud from 'tencentcloud-sdk-nodejs-tmt'

const actions = {
	get: {},
	post: {},
}

// 查询
actions.post.tencent = async options => {
	const { query, body } = options

	// console.log(body.text, Array.isArray(body.text), typeof body.text == 'string')

	if (!body.text || !(Array.isArray(body.text) || typeof body.text == 'string')) {
		return base.respFailure({
			msg: '必要参数缺失',
		})
	}

	const tencentcloud = await import('tencentcloud-sdk-nodejs-tmt')
	const TmtClient = tencentcloud.tmt.v20180321.Client

	// 请参见：https://cloud.tencent.com/document/product/1278/85305
	// 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取
	const clientConfig = {
		credential: {
			secretId: process.env.TENCENTCLOUD_SECRET_ID,
			secretKey: process.env.TENCENTCLOUD_SECRET_KEY,
		},
		region: 'ap-seoul',
		profile: {
			httpProfile: {
				endpoint: 'tmt.tencentcloudapi.com',
			},
		},
	}

	// 实例化要请求产品的client对象,clientProfile是可选的
	const client = new TmtClient(clientConfig)

	const params = {
		ProjectId: +process.env.TENCENTCLOUD_PROJECT_ID,
		Source: body.source || 'auto',
		Target: body.target || 'zh',
		SourceTextList: Array.isArray(body.text) ? body.text : [body.text],
	}
	// console.log(11111111, params)

	// 使用await等待翻译结果
	try {
		const res = await client.TextTranslateBatch(params)
		const data = res.TargetTextList
		delete res.TargetTextList
		return base.respSuccess({
			...res,
			msg: '翻译成功',
			data: Array.isArray(body.text) ? data : data[0],
		})
	} catch (error) {
		console.error('翻译错误:', error)
		return base.respFailure({
			msg: `翻译失败：${error.message}`,
		})
	}
}

export default async (req, resp) => {
	base.req = req
	base.resp = resp
	const { table, method, action, query, body } = base.getReqInfo()

	try {
		if (actions[method]?.[action]) {
			return await actions[method][action]({ query, body })
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
