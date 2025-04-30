const mysql = require('mysql2/promise')

// sqlpub
const db = mysql.createPool({
	host: process.env.DB_HOST || 'mysql2.sqlpub.com',
	port: process.env.DB_PORT || 3307,
	user: process.env.DB_USER || 'zengjin',
	password: process.env.DB_PASSWORD || '7kkriqhPBFxuksPN',
	database: process.env.DB_NAME || 'zengjin',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})
export default db
