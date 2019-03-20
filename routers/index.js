let controller = require('../controllers')
const Joi = require('joi')

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
	}, {
		path: '/praise',
		method: 'GET',
		config: {
			description: '给文章或者视频点赞/取消点赞',
			notes: 'praise',
			tags: ['api'],
			validate: {
				query: {
					uid: Joi.string().min(1).max(64).required(),
					tid: Joi.string().min(1).max(64).required(),
					ct: Joi.string().min(1).max(2).required()
				}
			}
		},
		handler: controller.operation.praise
	}, {
		path: '/collection',
		method: 'GET',
		config: {
			description: '收藏/取消收藏文章或者视频',
			notes: 'collection',
			tags: ['api'],
			validate: {
				query: {
					uid: Joi.string().min(1).max(64).required(),
					tid: Joi.string().min(1).max(64).required(),
					ct: Joi.string().min(1).max(2).required()
				}
			}
		},
		handler: controller.operation.collection
	}

]