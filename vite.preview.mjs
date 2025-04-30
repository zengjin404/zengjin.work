import { createServer } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import chalk from 'chalk'

let config = {
	// build: {
	// 	outDir: '.dist',
	// },
	plugins: [basicSsl()],
	server: {
		port: 1234,
		host: true,
		https: true,
	},
	// 将根目录设置为静态文件服务目录
	root: '.',
	// 禁用构建优化和打包
	build: false,
	// 配置静态文件服务
	publicDir: '.',
	// https: true,
	// proxy: {},
}

try {
	const server = await createServer(config)
	await server.listen()
	server.printUrls()
} catch (e) {
	console.log(chalk.red(`服务启动失败，${e}`))
}
