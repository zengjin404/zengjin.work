import { createServer, preview } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import chalk from 'chalk'

let config = {
	// 将根目录设置为静态文件服务目录
	// root: '.',
	// 配置静态文件服务
	build: {
		outDir: '.',
	},
	// publicDir: '.',
	// define: {
	// 	__DEFINES__: JSON.stringify(process.env),
	// },
	plugins: [basicSsl()],
	preview: {
		port: 1234,
		host: true,
		// https: true,
		proxy: {
			'/api/': {
				target: 'http://localhost:1232/',
				// target: 'https://zengjin.work/',
				changeOrigin: true, // 是否改变源
				secure: false, // 是否验证证书
			},
		},
	},
}

try {
	const server = await preview(config)
	server.printUrls()
} catch (e) {
	console.log(chalk.red(`预览失败，${e}`))
}
