/**
 * 密文转明文工具
 * 使用方法: node tool_decrypt.js "你的密文"
 */

import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ALGORITHM = 'aes-256-cbc'

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
		console.log('用法: node tool_decrypt.js "密文内容"')
		process.exit(0)
	}

	const ciphertext = args[0]
	const env = loadEnv()
	const secret = env.CRYPTO_SECRET

	if (!secret) {
		throw new Error('.env 中未找到 CRYPTO_SECRET')
	}

	const parts = ciphertext.split(':')
	if (parts.length !== 2) {
		throw new Error('密文格式无效, 正确格式为 "iv:data"')
	}

	const key = crypto.createHash('sha256').update(secret).digest()
	const iv = Buffer.from(parts[0], 'hex')
	const encryptedData = parts[1]

	const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
	let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
	decrypted += decipher.final('utf8')

	console.log('\n--- 解密结果 ---')
	console.log('密文:', ciphertext)
	console.log('明文:', decrypted)
	console.log('----------------\n')
} catch (err) {
	console.error('\n错误:', err.message)
	process.exit(1)
}
