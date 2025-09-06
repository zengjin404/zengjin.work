import pkg from 'pg'
const { Pool } = pkg

// 检查必要的环境变量是否存在
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD) {
	console.error('错误: 缺少必要的数据库连接环境变量。请确保设置了 DB_HOST, DB_USER 和 DB_PASSWORD。')
}

// 数据库连接配置
const dbConfig = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT || 5432,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME || 'postgres',
	max: 15, // 连接池最大连接数
	idleTimeoutMillis: 30000, // 连接最大空闲时间
}

// 在生产环境中启用 SSL
const isProd = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'
console.log('当前环境:', isProd ? '生产环境' : '开发环境')
if (isProd) {
	dbConfig.ssl = {
		require: true,
		rejectUnauthorized: true,
	}
}

const db = new Pool(dbConfig)
export default db
