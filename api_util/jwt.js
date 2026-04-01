import jwt from 'jsonwebtoken'
import { generateRandomToken } from './crypto.js'

/**
 * JWT工具模块
 * 提供Access Token的生成和验证功能
 */

/**
 * 获取JWT密钥
 */
function getSecret() {
	const secret = process.env.JWT_SECRET
	if (!secret) {
		throw new Error('环境变量 JWT_SECRET 未配置')
	}
	return secret
}

/**
 * 生成Access Token
 * @param {object} payload - 载荷数据，通常包含userId等信息
 * @returns {string} JWT token
 */
export function generateAccessToken(payload) {
	const secret = getSecret()
	// 15分钟有效期
	return jwt.sign(payload, secret, { expiresIn: '15m' })
}

/**
 * 验证Access Token
 * @param {string} token - JWT token
 * @returns {object} 解码后的载荷数据
 * @throws {Error} token无效或已过期时抛出异常
 */
export function verifyAccessToken(token) {
	const secret = getSecret()
	try {
		return jwt.verify(token, secret)
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			throw new Error('Token已过期')
		}
		if (error.name === 'JsonWebTokenError') {
			throw new Error('Token无效')
		}
		throw error
	}
}

/**
 * 生成Refresh Token
 * @returns {string} 随机生成的refresh token
 */
export function generateRefreshToken() {
	return generateRandomToken(32)
}
