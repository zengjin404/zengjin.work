// const db = require('../_base/_db')
import db from '../_base/_db'

module.exports = {
	default: async function handler(req, res) {
		const { method } = req
		// 从请求路径中获取操作类型
		const operation = req.url.split('/').pop()

		try {
			switch (operation) {
				case 'select':
					// 获取所有笔记
					const [notes] = await db.query('SELECT * FROM note ORDER BY id ASC')
					return res.status(200).json(notes)

				case 'detail':
					// 获取单个笔记
					const { id } = req.query
					if (!id) {
						return res.status(400).json({ error: '请指定笔记 ID' })
					}
					const [note] = await db.query('SELECT * FROM note WHERE id = ?', [id])
					return res.status(200).json(note[0] || { error: '笔记不存在' })

				case 'insert':
					if (method !== 'POST') {
						return res.status(405).json({ error: '插入操作必须使用 POST 方法' })
					}
					// 创建笔记
					const { title, content } = req.body
					if (!title || !content) {
						return res.status(400).json({ error: '标题和内容都是必需的' })
					}

					const [result] = await db.query('INSERT INTO note (title, content) VALUES (?, ?)', [title, content])

					const [newNote] = await db.query('SELECT * FROM note WHERE id = ?', [result.insertId])
					return res.status(201).json(newNote[0])

				case 'update':
					if (method !== 'POST') {
						return res.status(405).json({ error: '更新操作必须使用 POST 方法' })
					}
					// 更新笔记
					const updateData = req.body

					if (!updateData.id) {
						return res.status(400).json({ error: '请指定要更新的笔记 ID' })
					}

					const updateFields = []
					const updateValues = []

					if (updateData.title !== undefined) {
						updateFields.push('title = ?')
						updateValues.push(updateData.title)
					}

					if (updateData.content !== undefined) {
						updateFields.push('content = ?')
						updateValues.push(updateData.content)
					}

					if (updateFields.length === 0) {
						return res.status(400).json({ error: '没有提供要更新的字段' })
					}

					updateValues.push(updateData.id)
					await db.query(`UPDATE note SET ${updateFields.join(', ')} WHERE id = ?`, updateValues)

					const [updatedNote] = await db.query('SELECT * FROM note WHERE id = ?', [updateData.id])
					return res.status(200).json(updatedNote[0] || { error: '笔记不存在' })

				case 'delete':
					if (method !== 'POST') {
						return res.status(405).json({ error: '删除操作必须使用 POST 方法' })
					}
					// 删除笔记
					const deleteId = req.body.id
					if (!deleteId) {
						return res.status(400).json({ error: '请指定要删除的笔记 ID' })
					}

					const [deleteResult] = await db.query('DELETE FROM note WHERE id = ?', [deleteId])

					if (deleteResult.affectedRows === 0) {
						return res.status(404).json({ error: '笔记不存在' })
					}

					return res.status(200).json({ message: '笔记已删除' })

				default:
					return res.status(400).json({ error: '无效的操作类型' })
			}
		} catch (error) {
			return res.status(500).json({ error: '服务器内部错误', ...error })
		}
	},
}
