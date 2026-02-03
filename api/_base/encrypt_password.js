/**
 * 密码加密工具脚本
 * 用于生成AES加密后的密码，以便手动插入到数据库
 *
 * 使用方法：
 * node encrypt_password.js "明文密码"
 */

import crypto from 'crypto'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// 加载环境变量
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: resolve(__dirname, '../../.env') })

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16

/**
 * 获取加密密钥
 */
function getKey() {
	const secret = process.env.CRYPTO_SECRET
	if (!secret) {
		throw new Error('环境变量 CRYPTO_SECRET 未配置，请先在.env文件中配置')
	}
	return crypto.createHash('sha256').update(secret).digest()
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

// 主程序
const args = process.argv.slice(2)

if (args.length === 0) {
	console.log('使用方法: node encrypt_password.js "明文密码"')
	console.log('示例: node encrypt_password.js "123456"')
	process.exit(1)
}

const plainPassword = args[0]

try {
	const encryptedPassword = encryptPassword(plainPassword)
	console.log('\n=== 密码加密成功 ===')
	console.log('明文密码:', plainPassword)
	console.log('加密密码:', encryptedPassword)
	console.log('\n将以下SQL插入到Supabase中创建测试用户：')
	console.log(
		`
INSERT INTO base_user (username, password, phone, nickname)
VALUES ('testuser', '${encryptedPassword}', '13800138000', '测试用户');
	`.trim(),
	)
	console.log()
} catch (error) {
	console.error('加密失败:', error.message)
	process.exit(1)
}
