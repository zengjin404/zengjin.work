/**
 * 密码加密工具脚本（完全独立版本）
 * 直接读取.env文件，无需任何额外依赖
 *
 * 使用方法：
 * node encrypt_password_standalone.js "明文密码"
 */

import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16

/**
 * 从.env文件读取环境变量
 */
function loadEnv() {
	const envPath = path.resolve(__dirname, '../../.env')

	if (!fs.existsSync(envPath)) {
		console.error('\n错误: 找不到.env文件')
		console.error('路径:', envPath)
		process.exit(1)
	}

	const envContent = fs.readFileSync(envPath, 'utf8')
	const envVars = {}

	envContent.split('\n').forEach(line => {
		line = line.trim()
		if (line && !line.startsWith('#')) {
			const [key, ...valueParts] = line.split('=')
			if (key && valueParts.length > 0) {
				envVars[key.trim()] = valueParts.join('=').trim()
			}
		}
	})

	return envVars
}

/**
 * 获取加密密钥
 */
function getKey(envVars) {
	const secret = envVars.CRYPTO_SECRET
	if (!secret) {
		console.error('\n错误: .env文件中未配置 CRYPTO_SECRET')
		console.error('\n请在.env文件中添加：')
		console.error('CRYPTO_SECRET=<your-secret-key>\n')
		process.exit(1)
	}
	return crypto.createHash('sha256').update(secret).digest()
}

/**
 * AES加密密码
 */
function encryptPassword(plaintext, key) {
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

	let encrypted = cipher.update(plaintext, 'utf8', 'hex')
	encrypted += cipher.final('hex')

	return iv.toString('hex') + ':' + encrypted
}

// 主程序
const args = process.argv.slice(2)

if (args.length === 0) {
	console.log('\n使用方法: node encrypt_password_standalone.js "明文密码"')
	console.log('示例: node encrypt_password_standalone.js "123456"\n')
	process.exit(1)
}

const plainPassword = args[0]

try {
	// 加载.env文件
	const envVars = loadEnv()
	console.log('\n✓ 已读取.env文件')

	// 获取密钥
	const key = getKey(envVars)
	console.log('✓ 已加载加密密钥')

	// 加密密码
	const encryptedPassword = encryptPassword(plainPassword, key)

	console.log('\n=== 密码加密成功 ===')
	console.log('明文密码:', plainPassword)
	console.log('加密密码:', encryptedPassword)
	console.log('\n将以下SQL插入到Supabase中创建测试用户：')
	console.log(
		`
INSERT INTO base_user (id, username, password, phone, nickname)
VALUES ('user_001', 'testuser', '${encryptedPassword}', '13800138000', '测试用户');
	`.trim(),
	)
	console.log('\n注意：如果id已存在，请修改为其他值（如user_002）\n')
} catch (error) {
	console.error('\n加密失败:', error.message)
	console.error(error.stack)
	process.exit(1)
}
