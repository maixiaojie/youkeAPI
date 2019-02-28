let controller = require('../controllers')
const Joi = require('joi')

console.log(controller)
module.exports = [
{
	path: '/p',
	method: 'GET',
	config: {
		description: '根据id获取课程',
		notes: 'get api',
		tags: ['api'],
		validate: {
			query: {
				id: Joi.string().min(1).max(6).required()
			}
		}
	},
	handler: controller.course.getOne
}
]