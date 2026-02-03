/**
 * 明文转密文工具
 * 使用方法: node tool_encrypt.js "你的明文"
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
		throw new Error(`.env 文件未找到: ${envPath}`)
	}
	const content = fs.readFileSync(envPath, 'utf8')
	const env = {}
	content.split('\n').forEach(line => {
		const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
		if (match) {
			let value = match[2] || ''
			if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
			if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1)
			env[match[1]] = value
		}
	})
	return env
}

try {
	const args = process.argv.slice(2)
	if (args.length === 0) {
		console.log('用法: node tool_encrypt.js "明文内容"')
		process.exit(0)
	}

	const plaintext = args[0]
	const env = loadEnv()
	const secret = env.CRYPTO_SECRET

	if (!secret) {
		throw new Error('.env 中未找到 CRYPTO_SECRET')
	}

	const key = crypto.createHash('sha256').update(secret).digest()
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

	let encrypted = cipher.update(plaintext, 'utf8', 'hex')
	encrypted += cipher.final('hex')

	const ciphertext = `${iv.toString('hex')}:${encrypted}`

	console.log('\n--- 加密结果 ---')
	console.log('明文:', plaintext)
	console.log('密文:', ciphertext)
	console.log('----------------\n')
} catch (err) {
	console.error('\n错误:', err.message)
	process.exit(1)
}
