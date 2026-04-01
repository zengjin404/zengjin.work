import qiniu from 'qiniu'

// 七牛云全局配置
const accessKey = 'H1c7CF285tnZrwxglB3aTj_yuHHHEW8NDnke15Kc'
const secretKey = 'MkuFpwMfrwpeQG4UNn6s1ksWXBI94H7cJnUjVpHF'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

// 桶名称映射
const bucketMap = {
	file: 'zengjin-file',
	cdn: 'zengjin-cdn',
	drive: 'zengjin-drive',
}

const getBucketName = key => bucketMap[key] || key

const getConfig = () => {
	const config = new qiniu.conf.Config()
	config.zone = qiniu.zone.Zone_z0
	return config
}

const getBucketManager = () => new qiniu.rs.BucketManager(mac, getConfig())

/**
 * 获取上传凭证
 */
const getUploadToken = (bucketKey, options = {}) => {
	const bucketName = getBucketName(bucketKey)
	const putPolicy = new qiniu.rs.PutPolicy({
		scope: bucketName,
		expires: 3600,
		...options,
	})
	return {
		token: putPolicy.uploadToken(mac),
		bucket: bucketName,
		expires: 3600,
	}
}

/**
 * 列举文件
 */
const listFiles = (bucketKey, { prefix = '', marker = '', limit = 100, delimiter = '/' } = {}) => {
	const bucketName = getBucketName(bucketKey)
	const bucketManager = getBucketManager()
	return new Promise((resolve, reject) => {
		bucketManager.listPrefix(bucketName, { prefix, marker, limit, delimiter }, (err, respBody, respInfo) => {
			if (err) return reject(err)
			if (respInfo.statusCode === 200) {
				resolve(respBody)
			} else {
				reject(new Error(`Qiniu Error: ${respInfo.statusCode}`))
			}
		})
	})
}

/**
 * 删除文件
 */
const deleteFile = (bucketKey, key) => {
	const bucketName = getBucketName(bucketKey)
	const bucketManager = getBucketManager()
	return new Promise((resolve, reject) => {
		bucketManager.delete(bucketName, key, (err, respBody, respInfo) => {
			if (err) return reject(err)
			if (respInfo.statusCode === 200) {
				resolve(respBody)
			} else {
				reject(new Error(`Qiniu Error: ${respInfo.statusCode}`))
			}
		})
	})
}

/**
 * 移动/重命名文件
 */
const moveFile = (srcBucketKey, srcKey, destBucketKey, destKey, options = { force: false }) => {
	const srcBucket = getBucketName(srcBucketKey)
	const destBucket = getBucketName(destBucketKey)
	const bucketManager = getBucketManager()
	return new Promise((resolve, reject) => {
		bucketManager.move(srcBucket, srcKey, destBucket, destKey, options, (err, respBody, respInfo) => {
			if (err) return reject(err)
			if (respInfo.statusCode === 200) {
				resolve(respBody)
			} else {
				reject(new Error(`Qiniu Error: ${respInfo.statusCode}`))
			}
		})
	})
}

/**
 * 复制文件
 */
const copyFile = (srcBucketKey, srcKey, destBucketKey, destKey, options = { force: false }) => {
	const srcBucket = getBucketName(srcBucketKey)
	const destBucket = getBucketName(destBucketKey)
	const bucketManager = getBucketManager()
	return new Promise((resolve, reject) => {
		bucketManager.copy(srcBucket, srcKey, destBucket, destKey, options, (err, respBody, respInfo) => {
			if (err) return reject(err)
			if (respInfo.statusCode === 200) {
				resolve(respBody)
			} else {
				reject(new Error(`Qiniu Error: ${respInfo.statusCode}`))
			}
		})
	})
}

/**
 * 修改存储类型
 */
const changeType = (bucketKey, key, type) => {
	const bucketName = getBucketName(bucketKey)
	const bucketManager = getBucketManager()
	return new Promise((resolve, reject) => {
		bucketManager.changeType(bucketName, key, type, (err, respBody, respInfo) => {
			if (err) return reject(err)
			if (respInfo.statusCode === 200) {
				resolve(respBody)
			} else {
				reject(new Error(`Qiniu Error: ${respInfo.statusCode}`))
			}
		})
	})
}

/**
 * 创建目录 (在对象存储中通常是上传一个以 / 结尾的空文件)
 */
const createFolder = (bucketKey, prefix) => {
	const bucketName = getBucketName(bucketKey)
	const bucketManager = getBucketManager()
	// 确保 prefix 以 / 结尾
	const folderKey = prefix.endsWith('/') ? prefix : prefix + '/'
	return new Promise((resolve, reject) => {
		// 七牛云没有直接创建目录的 API，通常通过上传一个空文件或直接在上传文件时指定 key 来实现
		// 这里我们使用 putExtra 上传一个空内容
		const options = {
			scope: bucketName,
		}
		const putPolicy = new qiniu.rs.PutPolicy(options)
		const uploadToken = putPolicy.uploadToken(mac)
		const config = getConfig()
		const formUploader = new qiniu.form_up.FormUploader(config)
		const putExtra = new qiniu.form_up.PutExtra()

		formUploader.put(uploadToken, folderKey, '', putExtra, (err, respBody, respInfo) => {
			if (err) return reject(err)
			if (respInfo.statusCode === 200) {
				resolve(respBody)
			} else {
				reject(new Error(`Qiniu Error: ${respInfo.statusCode}`))
			}
		})
	})
}

export default {
	getUploadToken,
	listFiles,
	deleteFile,
	moveFile,
	copyFile,
	changeType,
	getBucketName,
	createFolder,
}
