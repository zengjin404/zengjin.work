import base from './_base/_base.js'
import curd from './_base/_crud.js'
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

export default async (req, resp) => {
	base.req = req
	base.resp = resp
	const { table, method, action, query, body } = base.getReqInfo()

	try {
		if (action === 'login') {
			if (body.account != 'admin' || body.password != '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92') {
				return base.respFailure({
					msg: '用户名或密码错误',
				})
			}
			return base.respSuccess({
				msg: '操作成功',
				data: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjU3MTYyODEsInVzZXIiOiJ7XCJ1c2VyVXVpZFwiOlwiYjlmMTM4MzktNDg3ZC00NzY3LThlMjItYmYyOGYxNTUyOWMxXCIsXCJhY2NvdW50XCI6XCJseXNnYWpcIixcIm5pY2tuYW1lXCI6XCJcXFxcdTRlMzRcXFxcdTZjODJcXFxcdTVlMDJcXFxcdTUxNmNcXFxcdTViODlcXFxcdTVjNDBcIixcImltTnVtXCI6XCI5OTAxMzcxMzAwNzY5OTRcIn0ifQ.dmSF9wp738rMcPAZlq5kjHi4Et5XlRaOTyKn0zuP10M',
			})
		}

		if (action === 'detail') {
			return base.respSuccess({
				msg: '操作成功',
				data: {
					id: 35627,
					uuid: 'b9f13839-487d-4767-8e22-bf28f15529c1',
					duUuid: null,
					imNum: '990137130076994',
					account: 'admin',
					idCardNum: null,
					nickname: '管理员',
					tel: null,
					mobile: null,
					accountUserType: 1,
					email: null,
					birthday: '1999-12-31T16:00:00.000+00:00',
					updateTime: '2024-08-24T11:45:39.000+00:00',
					createPerson: '管理员',
					createTime: '2024-05-18T10:52:08.000+00:00',
					initPwd: false,
					lyDeptType: null,
					others: [
						{
							duUuid: 'c6fe6b2e-761e-4b13-934b-134c9f5d6095',
							duName: null,
							isMain: 1,
							deptUuid: 'd2457664-70b7-4599-a89a-9054601210f8',
							deptName: '临沂市公安局',
							deptDuty: '4fd7ff69-19e2-4be3-a89d-31368d8d58ea',
							deptDutyValue: '601,',
							parentDeptUuid: 'eb21ecbe-46d6-4f33-a920-39a14a9c3fc6',
							parentDeptCode: '3713',
							parentDeptName: '临沂市',
							businessType: null,
							businessTypeName: null,
							userIdentity: '00848001-68b3-4e39-b185-07484d55862e',
							userIdentityName: '系统用户',
							userPosition: null,
							sourceId: null,
							sourceName: '2002',
							sourceZoningCode: '3713D001',
							sourceAccount: null,
							sourceType: 2,
							roleUuids:
								'db1f69fe-72b5-4ebb-8918-f7fb81d444bb,b64f8844-eb92-41ff-80b3-8a7669af8868,d185a2c7-b14d-4fea-bdd2-cd937503829d,17490fa3-f411-4f61-a1cd-32f6eb7402bf,0c3e79f5-6f10-4efc-a168-cf01f8b47361,69999e32-f9c3-48f3-a607-b93b75b62a60',
							accTypeClass: 2,
							accBusiClass: 1,
							accPlaceClass: null,
							orgUuid: 'eb21ecbe-46d6-4f33-a920-39a14a9c3fc6',
							orgCode: '3713',
							orgName: '临沂市',
							groupUuid: null,
							isGroup: 0,
						},
					],
				},
			})
		}

		if (action === 'changeDu') {
			return base.respSuccess({
				msg: '操作成功',
				data: {},
			})
		}

		return base.respFailure({
			msg: '请求类型或方法无效',
		})
	} catch (error) {
		return base.respFailure({
			msg: `服务器内部错误: ${error.message}`,
		})
	}
}
