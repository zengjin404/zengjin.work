const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')
const os = require('os')
const packageJson = require('../package.json')
const fs = require('fs')

const docs = {
	_: ['note.js'],
	mzl: ['zone/mzl/class.js', 'zone/mzl/student.js'],
}

function main(req, resp) {
	try {
		// 验证登录状态
		const cookies = parseCookies(req)
		const password = cookies.apiDocPassword
		const correctPassword = '123456' // 这里设置你的访问密码

		let action = ''

		// 修改 action 解析逻辑
		if (req.url.includes('swagger.json')) {
			const urlObj = new URL(req.url, `http://${req.headers.host}`)
			action = urlObj.searchParams.get('action') || ''
		} else {
			const urlParts = req.url.split('/').filter(Boolean)
			const docIndex = urlParts.indexOf('doc')
			if (docIndex !== -1 && urlParts.length > docIndex + 1) {
				action = urlParts[docIndex + 1]
			}
		}

		// 清理 action
		action = action.replace(/[\/\?]+$/, '').trim()

		// 验证action是否有效
		if (!docs[action]) {
			action = ''
		}

		// 如果未登录且不是静态资源请求，显示登录页面
		if (!action && password !== correctPassword && !req.url.includes('plugin/')) {
			const loginHtml = fs.readFileSync(path.join(__dirname, '_base/swagger_login.html'), 'utf8').replace('${correctPassword}', correctPassword)
			resp.setHeader('Content-Type', 'text/html')
			resp.end(loginHtml)
			return
		}

		// 添加调试日志
		console.log('Action:', action)
		console.log('Docs config:', docs)

		// 根据action生成swagger文档
		let swaggerSpec
		if (action && docs[action]) {
			console.log('Generating spec for action:', action)
			swaggerSpec = createSwaggerSpec(action)
		} else {
			console.log('Generating default spec')
			swaggerSpec = createSwaggerSpec()
		}

		// 设置响应头
		resp.setHeader('Content-Type', 'application/json')
		resp.setHeader('Access-Control-Allow-Origin', '*')

		// 发送响应
		if (req.url.includes('swagger.json')) {
			resp.end(JSON.stringify(swaggerSpec))
		} else {
			// 返回HTML页面
			const html = fs.readFileSync(path.join(__dirname, '_base/swagger.html'), 'utf8')
			resp.setHeader('Content-Type', 'text/html')
			resp.end(html)
		}
	} catch (error) {
		console.error('Error in main:', error)
		resp.status(500).json({
			error: 'Internal Server Error',
			message: error.message,
			stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
		})
	}
}

// 解析 cookies
function parseCookies(req) {
	const cookies = {}
	const cookieHeader = req.headers.cookie
	if (cookieHeader) {
		cookieHeader.split(';').forEach(cookie => {
			const parts = cookie.split('=')
			const name = parts[0].trim()
			const value = parts[1] || ''
			cookies[name] = value.trim()
		})
	}
	return cookies
}

// 创建一个函数来生成swagger配置
function createSwaggerSpec(action) {
	// 修改 apiPath 的获取方式
	const apiPath = process.env.VERCEL
		? path.join(__dirname) // Vercel 环境下的路径
		: path.join(__dirname)

	const port = getPortFromPackageJson()
	const options = {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'api.zengjin.work',
				version: '1.0.0',
			},
			servers: [
				{
					url: process.env.VERCEL
						? 'https://zengjin.work/api' // 修改为实际的生产环境 URL
						: `http://${getLocalIP()}:${port}/api`,
				},
			],
		},
		apis:
			action && docs[action]
				? docs[action].map(file => {
						console.log(11111111, path.join(apiPath, file))

						return path.join(apiPath, file)
					})
				: Object.values(docs)
						.flat()
						.map(file => {
							console.log(11111111, path.join(apiPath, file))
							return path.join(apiPath, file)
						}),
	}

	try {
		const spec = swaggerJsdoc(options)
		return spec
	} catch (error) {
		console.error('Error generating swagger spec:', error)
		return {
			openapi: '3.0.0',
			info: {
				title: 'Error',
				version: '1.0.0',
				description: `Error generating spec: ${error.message}`,
			},
			paths: {},
		}
	}
}

// 获取本机IP地址
function getLocalIP() {
	const interfaces = os.networkInterfaces()
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name]) {
			// 跳过内部IP和非IPv4地址
			if (iface.internal || iface.family !== 'IPv4') {
				continue
			}
			return iface.address
		}
	}
	return 'localhost'
}
// 从 package.json 中解析端口号
function getPortFromPackageJson() {
	const serveScript = packageJson.scripts.serve
	const portMatch = serveScript.match(/--listen\s+[0-9.]+:(\d+)/)
	return portMatch ? portMatch[1] : '3000'
}

module.exports = main
