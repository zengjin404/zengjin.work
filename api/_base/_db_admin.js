import { createClient } from '@supabase/supabase-js'
/**
 * Supabase Service Role Client
 * - 仅用于服务端（Vercel Functions）
 * - 可绕过 RLS
 * - 绝不能暴露到前端
 */
export default function createDbAdmin() {
	const url = process.env.SUPABASE_URL
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY

	if (!url || !key) {
		throw new Error('错误: 缺少必要的数据库连接环境变量。请确保设置了 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY')
	}
	// 判断环境
	const isProd = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'
	console.log('当前环境:', isProd ? '生产环境' : '开发环境')

	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		},
	})
}
