let models = require('../models');
const Op = models.Op;
let course = {
	async getOne(req) {
		let info = await models.course.findOne({
			where: {
				id: req.query.id
			}
		});
		return {data: info}
	},
	async search(req) {
		var pageSize = parseInt(req.params.pageSize) || 1;
		var pageNum = parseInt(req.params.pageNum) || 10;
		var keyword = req.query.keyword;
		if(keyword) {
			let data = await models.course.findAll({
				where: {
					[Op.or]: [
						{
							course_type_name: {
								[Op.like]: '%'+keyword+'%'
							}
						},
						{
							course_name: {
								[Op.like]: '%'+keyword+'%'
							}
						}
					]
				},
				limit: pageSize,
				offset: (pageNum - 1) * pageSize
			});
			return {
				code: 1,
				data,
				msg: '查询成功'
			}
		}else {
			let data = [];
			return {
				code: 0,
				data,
				msg: '查询成功'
			}
		}
		
	},
	async getLessonList(req) {
		let courseid = req.params.courseid;
		let courseIntroduceData = await models.sequelize.query(` select * from course_introduce RIGHT JOIN course on course.id = course_introduce.course_id  where course_introduce.course_id = '${courseid}' GROUP BY course.id `);
		let lessonData = await models.sequelize.query(`select * from lesson left join lesson_detail on lesson.lesson_id = lesson_detail.lesson_id  where course_id='${courseid}' group by lesson.lesson_id`)
		return {
			code: 1,
			data: {
				courseIntroduceData: courseIntroduceData[0],
				lessonData: lessonData[0]
			},
			msg: '查询成功'
		}
	},
	/**
	 * 根据课程类型  查询当前类别下的课程
	 * 前端 - web
	 * 运维 - oam
	 * 网络运营 - op
	 * 产品经理 - pm
	 * IOS - ios
	 * Android - android
	 * python - python
	 * PHP - php
	 * 嵌入式 - qrsqd
	 * 物联网 - iot
	 * 平面设计 - gd
	 * UI设计 - ui
	 * 软件测试 - te (无数据)
	 * 全部 - all
	 * 
	 * @param {*} req 
	 */
	async getCourseInfo(req) {
		let type = req.query.type;
		let pagenum = req.params.pageNum;
		let pagesize = req.params.pageSize;
		let num = (pagenum - 1 ) * pagesize;
		let courseData = [];
		if(type == 'all') {
			courseData = await models.sequelize.query(`select * from course order by id DESC limit ${pagesize} offset ${num} `);
		}
		else {
			courseData = await models.sequelize.query(`select * from course where course_type_name = '${type}' order by id DESC limit ${pagesize} offset ${num} `)
		}
		return {
			code: 1,
			data: courseData[0],
			msg: '查询成功'
		}
	}
}

module.exports = course;