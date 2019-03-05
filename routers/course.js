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