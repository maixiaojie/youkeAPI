let controller = require('../controllers')
const Joi = require('joi')


module.exports = [
    {
        path: '/course/search/{pageNum}/{pageSize}',
        method: 'GET',
        config: {
            description: '分页搜索课程信息',
            notes: 'course list',
            tags: ['course'],
            validate: {
                query: {
                    keyword: Joi.string().required()
                }
            }
        },
        handler: controller.course.search
    }, {
        path: '/course/getCourseList/{pageNum}/{pageSize}',
        method: 'GET',
        config: {
            description: '根据分类获取课程信息',
            notes: 'course list',
            tags: ['course'],
            validate: {
                query: {
                    type: Joi.string().required()
                }
            }
        },
        handler: controller.course.getCourseInfo
    }, {
        path: '/course/getLessonList/{courseid}',
        method: 'GET',
        config: {
            description: '获取课程详细信息',
            notes: 'course list',
            tags: ['course'],
            validate: {
            }
        },
        handler: controller.course.getLessonList
    }
]