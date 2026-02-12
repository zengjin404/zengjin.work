import base from '../../../_base/_base.js'
import curd from '../../../_base/_crud.js'
import { requireAuth } from '../../../_base/_auth_middleware.js'

const actions = { ...curd }

const fields = 'id,name,leader,slogan,createtime'.split(',')
const valids = 'name,leader'.split(',')
const joins = {}

export default requireAuth(async (req, resp) => {
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
			msg: '服务器内部错误',
			...error,
		})
	}
})

/**
 * @swagger
 * /zone/mzl/class/select:
 *   get:
 *     summary: 班级-查询列表
 *     tags: [/zone/mzl/class-班级]
 *     parameters:
 *       - name: current
 *         description: 当前页码
 *         required: true
 *         in: query
 *       - name: pageSize
 *         description: 每页条数
 *         required: true
 *         in: query
 *       - name: name
 *         description: 班级名称
 *         in: query
 *       - name: leader
 *         description: 班主任
 *         in: query
 *       - name: slogan
 *         description: 班级口号
 *         in: query
 *       - name: createtime
 *         description: 创建时间
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
 *                       name:
 *                         example: 班级名称
 *                       leader:
 *                         example: 班主任
 *                       slogan:
 *                         example: 班级口号
 *                       createtime:
 *                         example: 创建时间
 */

/**
 * @swagger
 * /zone/mzl/class/detail:
 *   get:
 *     summary: 班级-查询详情
 *     tags: [/zone/mzl/class-班级]
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
 *                     name:
 *                       example: 班级名称
 *                     leader:
 *                       example: 班主任
 *                     slogan:
 *                       example: 班级口号
 *                     createtime:
 *                       example: 创建时间
 */

/**
 * @swagger
 * /zone/mzl/class/insert:
 *   post:
 *     summary: 班级-新增
 *     tags: [/zone/mzl/class-班级]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - leader
 *             properties:
 *               name:
 *                 example: 班级名称
 *               leader:
 *                 example: 班主任
 *               slogan:
 *                 example: 班级口号
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
 * /zone/mzl/class/update:
 *   post:
 *     summary: 班级-修改
 *     tags: [/zone/mzl/class-班级]
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
 *               name:
 *                 example: 班级名称
 *               leader:
 *                 example: 班主任
 *               slogan:
 *                 example: 班级口号
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
 * /zone/mzl/class/delete:
 *   post:
 *     summary: 班级-删除
 *     tags: [/zone/mzl/class-班级]
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
