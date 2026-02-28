import provider from '../_base/_storage_provider.js'
import base from '../_base/_base.js'

// 业务常量
const BUCKET = 'file'
const MODULE_DRIVE = 'drive'
const MODULE_RECYCLE = 'recycle'

// 自动分类映射
const TYPE_MAP = {
	image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
	video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'],
	audio: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'],
	doc: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt', 'md'],
}

/**
 * 根据文件名获取分类
 */
const getCategory = fileName => {
	const ext = fileName.split('.').pop().toLowerCase()
	for (const [cat, exts] of Object.entries(TYPE_MAP)) {
		if (exts.includes(ext)) return cat
	}
	return 'other'
}

/**
 * 剥离 ID 前缀获取原始文件名
 */
const getOriginalName = key => {
	const fileName = key.split('/').pop()
	const index = fileName.indexOf('_')
	return index > -1 ? fileName.substring(index + 1) : fileName
}

/**
 * 用户文件业务逻辑控制器 (Controller)
 */
export default async (req, resp) => {
	base.req = req
	base.resp = resp
	const { action, query, body } = base.getReqInfo()

	// TODO: 从 JWT/Session 获取真实 userId，目前硬编码演示
	const userId = 'user_001'

	try {
		// 1. 获取上传凭证 (自动处理路径和 ID 前缀)
		if (action === 'token') {
			const fileName = query.name || body.name || 'file'
			const category = getCategory(fileName)
			const datePrefix = base.getTime().substring(0, 7).replace('-', '') // yyyymm
			const fileId = base.getId()

			// 最终路径：user_001/drive/image/202602/m2k3j4h5g8f2_myphoto.jpg
			const key = `${userId}/${MODULE_DRIVE}/${category}/${datePrefix}/${fileId}_${fileName}`

			const data = provider.getUploadToken(BUCKET, {
				scope: `${provider.getBucketName(BUCKET)}:${key}`, // 限制只能上传到这个 key
				returnBody: `{"key":"$(key)","name":"${fileName}","fileId":"${fileId}","category":"${category}"}`,
			})

			return base.respSuccess({ data: { ...data, key } })
		}

		// 2. 列表查询 (自动剥离前缀，处理模拟目录)
		if (action === 'list') {
			const subPrefix = query.prefix || query['params[prefix]'] || '' // 相对路径，如 "image/"
			const fullPrefix = `${userId}/${MODULE_DRIVE}/${subPrefix}`

			const result = await provider.listFiles(BUCKET, {
				prefix: fullPrefix,
				delimiter: '/',
			})

			const list = [
				...(result.commonPrefixes || []).map(p => ({
					name: p.replace(fullPrefix, '').replace('/', ''),
					prefix: p.replace(`${userId}/${MODULE_DRIVE}/`, ''), // 返回相对业务路径
					fullPrefix: p,
					type: 'dir',
				})),
				...(result.items || []).map(item => ({
					...item,
					originalName: getOriginalName(item.key),
					name: getOriginalName(item.key), // 统一前端显示的名称
					relKey: item.key.replace(`${userId}/${MODULE_DRIVE}/`, ''), // 相对业务路径
					type: 'file',
				})),
			]

			return base.respSuccess({ data: { list, marker: result.marker } })
		}

		// 3. 软删除 (移动到 recycle 目录 + 转为低频存储)
		if (action === 'delete') {
			const relKey = body.key // 相对业务路径，如 "image/202602/id_name.jpg"
			if (!relKey) return base.respFailure({ msg: 'Missing key' })

			const srcKey = `${userId}/${MODULE_DRIVE}/${relKey}`
			const destKey = `${userId}/${MODULE_RECYCLE}/${relKey}`

			// 1. 移动文件
			await provider.moveFile(BUCKET, srcKey, BUCKET, destKey)
			// 2. 修改存储类型为低频 (1) 以节省成本
			try {
				await provider.changeType(BUCKET, destKey, 1)
			} catch (e) {
				console.warn('Chtype failed (maybe not supported by bucket), but move succeeded.')
			}

			return base.respSuccess({ msg: '已移至回收站' })
		}

		// 4. 恢复文件
		if (action === 'restore') {
			const relKey = body.key // 相对业务路径
			const srcKey = `${userId}/${MODULE_RECYCLE}/${relKey}`
			const destKey = `${userId}/${MODULE_DRIVE}/${relKey}`

			await provider.moveFile(BUCKET, srcKey, BUCKET, destKey)
			await provider.changeType(BUCKET, destKey, 0) // 恢复为标准存储 (0)

			return base.respSuccess({ msg: '文件已恢复' })
		}

		return base.respFailure({ msg: 'Action Not Found' })
	} catch (error) {
		return base.respFailure({ msg: 'Error', error: error.message })
	}
}
