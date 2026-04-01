import crypto from 'crypto'

/**
 * 加密工具模块
 * 提供AES加密/解密和Token哈希功能
 */

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16

/**
 * 获取加密密钥
 * 从环境变量读取，确保长度为32字节
 */
function getKey() {
	const secret = process.env.CRYPTO_SECRET
	if (!secret) {
		throw new Error('环境变量 CRYPTO_SECRET 未配置')
	}
	// 使用SHA256确保密钥长度为32字节
	return crypto.createHash('sha256').update(secret).digest()
}

/**
 * AES加密密码
 * @param {string} plaintext - 明文密码
 * @returns {string} 加密后的密文（格式：iv:encryptedData）
 */
export function encryptPassword(plaintext) {
	const key = getKey()
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

	let encrypted = cipher.update(plaintext, 'utf8', 'hex')
	encrypted += cipher.final('hex')

	// 返回格式：iv:encryptedData
	return iv.toString('hex') + ':' + encrypted
}

/**
 * AES解密密码
 * @param {string} ciphertext - 密文（格式：iv:encryptedData）
 * @returns {string} 解密后的明文密码
 */
export function decryptPassword(ciphertext) {
	const key = getKey()
	const parts = ciphertext.split(':')

	if (parts.length !== 2) {
		throw new Error('密文格式错误')
	}

	const iv = Buffer.from(parts[0], 'hex')
	const encryptedData = parts[1]
	const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)

	let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
	decrypted += decipher.final('utf8')

	return decrypted
}

/**
 * 使用SHA256哈希Token
 * @param {string} token - 原始token
 * @returns {string} 哈希后的token
 */
export function hashToken(token) {
	return crypto.createHash('sha256').update(token).digest('hex')
}

/**
 * 生成随机Token
 * @param {number} length - 字节长度，默认32
 * @returns {string} 随机生成的token（hex格式）
 */
export function generateRandomToken(length = 32) {
	return crypto.randomBytes(length).toString('hex')
}
