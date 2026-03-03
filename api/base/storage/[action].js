import provider from '../../_base/_storage_provider.js'
import base from '../../_base/_base.js'

/**
 * 通用存储适配器 (Provider)
 * 职责：直接与云厂商通信，不含业务逻辑
 */
export default async (req, resp) => {
	base.req = req
	base.resp = resp
	const { action, query, body } = base.getReqInfo()

	// 获取目标桶 (兼容嵌套参数格式)
	const bucket = query.bucket || query['params[bucket]'] || body.bucket || 'file'

	try {
		// 1. 获取上传凭证
		if (action === 'token') {
			const options = {
				returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)","mimeType":"$(mimeType)"}',
			}
			const data = provider.getUploadToken(bucket, options)
			return base.respSuccess({ data })
		}

		// 2. 原始列表获取
		if (action === 'list') {
			const prefix = query.prefix || query['params[prefix]'] || ''
			const marker = query.marker || query['params[marker]'] || ''
			const limit = parseInt(query.limit || query['params[limit]']) || 100
			const delimiter = query.delimiter || query['params[delimiter]'] || '/'

			const data = await provider.listFiles(bucket, { prefix, marker, limit, delimiter })
			return base.respSuccess({ data })
		}

		// 3. 物理删除
		if (action === 'delete') {
			const key = query.key || body.key
			if (!key) return base.respFailure({ msg: 'Missing key' })
			await provider.deleteFile(bucket, key)
			return base.respSuccess({ msg: 'Deleted' })
		}

		// 4. 物理移动/重命名
		if (action === 'move') {
			const { srcKey, destKey, srcBucket = bucket, destBucket = bucket } = body
			if (!srcKey || !destKey) return base.respFailure({ msg: 'Missing srcKey or destKey' })
			await provider.moveFile(srcBucket, srcKey, destBucket, destKey)
			return base.respSuccess({ msg: 'Moved' })
		}

		// 5. 物理复制
		if (action === 'copy') {
			const { srcKey, destKey, srcBucket = bucket, destBucket = bucket } = body
			if (!srcKey || !destKey) return base.respFailure({ msg: 'Missing srcKey or destKey' })
			await provider.copyFile(srcBucket, srcKey, destBucket, destKey)
			return base.respSuccess({ msg: 'Copied' })
		}

		// 5. 修改存储类型
		if (action === 'chtype') {
			const { key, type } = body
			if (!key || type == null) return base.respFailure({ msg: 'Missing key or type' })
			await provider.changeType(bucket, key, type)
			return base.respSuccess({ msg: 'Type Changed' })
		}

		// 6. 新建文件夹
		if (action === 'mkdir') {
			const { prefix } = body
			if (!prefix) return base.respFailure({ msg: 'Missing prefix' })
			await provider.createFolder(bucket, prefix)
			return base.respSuccess({ msg: 'Folder Created' })
		}

		return base.respFailure({ msg: 'Action Not Found' })
	} catch (error) {
		return base.respFailure({ msg: 'Error', error: error.message })
	}
}
