let controller = require('../controllers')
const Joi = require('joi')


module.exports = [
{
	path: '/course/getList/{pageNum}/{pageSize}',
	method: 'GET',
	config: {
		description: '分页获取所有课程列表',
		notes: 'course list',
		tags: ['course'],
		validate: {
		}
	},
	handler: controller.course.getList
}
]