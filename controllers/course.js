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
	async getList(req) {
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
			let data = await models.course.findAll({
				limit: pageSize,
				offset: (pageNum - 1) * pageSize,
				order: [
					['id', 'DESC']
				]
			});
			return {
				code: 1,
				data,
				msg: '查询成功'
			}
		}
		
	},
	async getLessonList(req) {
		let courseid = req.params.courseid;
		let courseIntroduceData = await models.sequelize.query(` select * from course_introduce RIGHT JOIN course on course.id = course_introduce.course_id  where course_introduce.course_id = '${courseid}' GROUP BY course.id `);
		let lessonData = await models.sequelize.query(`select * from lesson left join lesson_detail on lesson.lesson_id = lesson_detail.lesson_id  where course_id='${courseid}'`)
		return {
			code: 1,
			data: {
				courseIntroduceData: courseIntroduceData[0],
				lessonData: lessonData[0]
			},
			msg: '查询成功'
		}
	}
}

module.exports = course;