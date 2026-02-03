/**
 * 密码加密工具脚本（简化版，无需额外依赖）
 * 用于生成AES加密后的密码，以便手动插入到数据库
 * 
 * 使用方法：
 * 1. 先在命令行设置环境变量（Windows PowerShell）：
 *    $env:CRYPTO_SECRET="your-secret-key"
 * 2. 然后运行：
 *    node encrypt_password_simple.js "明文密码"
 * 
 * 或者直接在下面第16行修改 CRYPTO_SECRET 常量
 */

import crypto from 'crypto'

// 方式1: 直接在这里设置密钥（不推荐，仅用于测试）
// const CRYPTO_SECRET = '你的密钥'

// 方式2: 从环境变量读取（推荐）
const CRYPTO_SECRET = process.env.CRYPTO_SECRET

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16

/**
 * 获取加密密钥
 */
function getKey() {
	if (!CRYPTO_SECRET) {
		console.error('\n错误: 环境变量 CRYPTO_SECRET 未配置')
		console.log('\n请先设置环境变量（Windows PowerShell）：')
		console.log('  $env:CRYPTO_SECRET="your-secret-key"')
		console.log('\n或者直接在脚本第16行修改 CRYPTO_SECRET 常量\n')
		process.exit(1)
	}
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

// 主程序
const args = process.argv.slice(2)

if (args.length === 0) {
	console.log('\n使用方法: node encrypt_password_simple.js "明文密码"')
	console.log('示例: node encrypt_password_simple.js "123456"\n')
	process.exit(1)
}

const plainPassword = args[0]

try {
	const encryptedPassword = encryptPassword(plainPassword)
	console.log('\n=== 密码加密成功 ===')
	console.log('明文密码:', plainPassword)
	console.log('加密密码:', encryptedPassword)
	console.log('\n将以下SQL插入到Supabase中创建测试用户：')
	console.log(`
INSERT INTO base_user (username, password, phone, nickname)
VALUES ('testuser', '${encryptedPassword}', '13800138000', '测试用户');
	`.trim())
	console.log()
} catch (error) {
	console.error('加密失败:', error.message)
	process.exit(1)
}
