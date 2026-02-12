import base from '../../../_base/_base.js'
import curd from '../../../_base/_crud.js'
import { requireAuth } from '../../../_base/_auth_middleware.js'

const actions = { ...curd }

const fields = 'id,name,sex,age,address,createtime,updatetime,class_id'.split(',')
const valids = 'name,sex'.split(',')
const joins = [
	{
		table: 'zone_mzl_class class',
		on: 'class_id = class.id',
		fields: 'name,leader,slogan'.split(','),
	},
]

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
			msg: `服务器内部错误: ${error.message}`,
		})
	}
})

/**
 * @swagger
 * /zone/mzl/student/select:
 *   get:
 *     summary: 学生-查询列表
 *     tags: [/zone/mzl/student-学生]
 *     parameters:
 *       - name: current
 *         description: 当前页码
 *         required: true
 *         in: query
 *       - name: pageSize
 *         description: 每页条数
 *         required: true
 *         in: query
 *       - name: class_id
 *         description: 班级id
 *         in: query
 *       - name: name
 *         description: 姓名
 *         in: query
 *       - name: age
 *         description: 年龄
 *         in: query
 *       - name: sex
 *         description: 性别
 *         in: query
 *       - name: address
 *         description: 地址
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
 *                         example: 姓名
 *                       age:
 *                         example: 年龄
 *                       sex:
 *                         example: 性别
 *                       address:
 *                         example: 地址
 *                       createtime:
 *                         example: 创建时间
 *                       class_id:
 *                         example: 班级id
 *                       class_name:
 *                         example: 班级名称
 *                       class_leader:
 *                         example: 班主任
 *                       class_slogan:
 *                         example: 班级口号
 */

/**
 * @swagger
 * /zone/mzl/student/detail:
 *   get:
 *     summary: 学生-查询详情
 *     tags: [/zone/mzl/student-学生]
 *     parameters:
 *       - name: id
 *         required: true
 *         description: id
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
 *                       example: 姓名
 *                     age:
 *                       example: 年龄
 *                     sex:
 *                       example: 性别
 *                     address:
 *                       example: 地址
 *                     createtime:
 *                       example: 创建时间
 *                     class_id:
 *                       example: 班级id
 *                     class_name:
 *                       example: 班级名称
 *                     class_leader:
 *                       example: 班主任
 *                     class_slogan:
 *                       example: 班级口号
 */

/**
 * @swagger
 * /zone/mzl/student/insert:
 *   post:
 *     summary: 学生-新增
 *     tags: [/zone/mzl/student-学生]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - sex
 *               - address
 *             properties:
 *               name:
 *                 example: 姓名
 *               age:
 *                 example: 年龄
 *               sex:
 *                 example: 性别
 *               address:
 *                 example: 地址
 *               class_id:
 *                 example: 班级id
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
 * /zone/mzl/student/update:
 *   post:
 *     summary: 学生-修改
 *     tags: [/zone/mzl/student-学生]
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
 *                 example: 姓名
 *               age:
 *                 example: 年龄
 *               sex:
 *                 example: 性别
 *               address:
 *                 example: 地址
 *               class_id:
 *                 example: 班级id
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
 * /zone/mzl/student/delete:
 *   post:
 *     summary: 学生-删除
 *     tags: [/zone/mzl/student-学生]
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
