import base from './_base/_base.js'
import crud from './_base/_crud.js'
const actions = { ...crud }

const fields = 'id,user_id,title,abstract,content,img,createtime,updatetime,toptime'.split(',')
const valids = 'title,abstract,content'.split(',')
const joins = {}

export default async (req, resp) => {
	base.req = req
	base.resp = resp
	const { table, method, action, query, body } = base.getReqInfo()

	try {
		if (actions[method]?.[action]) {
			return await actions[method][action]({ table, fields, valids, joins, query, body })
		} else {
			return base.respFailure({
				msg: '请求类型或方法无效',
			})
		}
	} catch (error) {
		return base.respFailure({
			msg: `服务器内部错误: ${error.message}`,
		})
	}
}

/**
 * @swagger
 * /note/select:
 *   get:
 *     summary: 笔记-查询列表
 *     tags: [note-笔记]
 *     parameters:
 *       - name: current
 *         description: 当前页码
 *         required: true
 *         in: query
 *       - name: pageSize
 *         description: 每页条数
 *         required: true
 *         in: query
 *       - name: title
 *         description: 标题
 *         in: query
 *       - name: abstract
 *         description: 摘要
 *         in: query
 *       - name: content
 *         in: query
 *     responses:
 *       200:
 *         description: 成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   example: 0
 *                 msg:
 *                   example: 查询成功
 *                 total:
 *                   example: 总条数
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         example: id
 *                       title:
 *                         example: 标题
 *                       abstract:
 *                         example: 摘要
 *                       content:
 *                         example: 内容
 *                       img:
 *                         example: 缩略图路径
 */

/**
 * @swagger
 * /note/detail:
 *   get:
 *     summary: 笔记-查询详情
 *     tags: [note-笔记]
 *     parameters:
 *       - name: id
 *         description: id
 *         required: true
 *         in: query
 *     responses:
 *       200:
 *         description: 成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   example: 0
 *                 msg:
 *                   example: 查询成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       example: id
 *                     title:
 *                       example: 标题
 *                     abstract:
 *                       example: 摘要
 *                     content:
 *                       example: 内容
 *                     img:
 *                       example: 缩略图路径
 */

/**
 * @swagger
 * /note/insert:
 *   post:
 *     summary: 笔记-新增
 *     tags: [note-笔记]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 example: 标题
 *               abstract:
 *                 example: 摘要
 *               content:
 *                 example: 内容
 *               img:
 *                 example: 图片
 *     responses:
 *       200:
 *         description: 成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   example: 0
 *                 msg:
 *                   example: 新增成功
 *                 data:
 *                   example: 新增成功的id
 */

/**
 * @swagger
 * /note/update:
 *   post:
 *     summary: 笔记-修改
 *     tags: [note-笔记]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 example: id,批量用逗号分隔
 *               title:
 *                 example: 标题
 *               abstract:
 *                 example: 摘要
 *               content:
 *                 example: 内容
 *               img:
 *                 example: 图片
 *     responses:
 *       200:
 *         description: 成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   example: 0
 *                 msg:
 *                   example: 编辑成功
 *                 data:
 *                   example: 编辑成功的id,批量用逗号分隔
 */

/**
 * @swagger
 * /note/delete:
 *   post:
 *     summary: 笔记-删除
 *     tags: [note-笔记]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 example: id,批量用逗号分隔
 *     responses:
 *       200:
 *         description: 成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   example: 0
 *                 msg:
 *                   example: 删除成功
 *                 data:
 *                   example: 删除成功的id,批量用逗号分隔
 */
