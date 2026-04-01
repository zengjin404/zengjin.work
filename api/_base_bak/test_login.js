/**
 * 登录接口测试脚本
 * 用于本地测试登录逻辑是否正常工作
 */

import crypto from 'crypto'

// 模拟环境变量
const CRYPTO_SECRET = 'bbf0f0370a578bef49be51a46d792e34911b433357db306d21094f508ce97c40'
const JWT_SECRET = 'cca4c00ae69d00560e96b6665f2c09c618c23bbff3f06bc97ce7d61e9c909d37'

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16

/**
 * 获取加密密钥
 */
function getKey() {
	return crypto.createHash('sha256').update(CRYPTO_SECRET).digest()
}

/**
 * AES加密密码
 */
function encryptPassword(plaintext) {
	const key = getKey()
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

	let encrypted = cipher.update(plaintext, 'utf8', 'hex')
	encrypted += cipher.final('hex')

	return iv.toString('hex') + ':' + encrypted
}

/**
 * AES解密密码
 */
function decryptPassword(ciphertext) {
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

// 测试加密解密
console.log('\n=== 测试加密解密功能 ===')
const testPassword = '123456'
console.log('明文密码:', testPassword)

const encrypted = encryptPassword(testPassword)
console.log('加密后:', encrypted)

const decrypted = decryptPassword(encrypted)
console.log('解密后:', decrypted)

if (decrypted === testPassword) {
	console.log('✓ 加密解密功能正常\n')
} else {
	console.log('✗ 加密解密功能异常\n')
}

// 测试JWT
console.log('=== 测试JWT功能 ===')
try {
	const jwt = await import('jsonwebtoken')
	const payload = { userId: 'test123', username: 'testuser' }

	const token = jwt.default.sign(payload, JWT_SECRET, { expiresIn: '15m' })
	console.log('生成的Token:', token.substring(0, 50) + '...')

	const verified = jwt.default.verify(token, JWT_SECRET)
	console.log('验证结果:', verified)
	console.log('✓ JWT功能正常\n')
} catch (error) {
	console.error('✗ JWT功能异常:', error.message, '\n')
}
