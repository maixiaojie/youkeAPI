let controller = require('../controllers')
const Joi = require('joi')

module.exports = [{
    path: '/task/list',
    method: 'GET',
    config: {
        description: '我的任务',
        notes: 'task list',
        tags: ['task'],
        validate: {
            query: {
                uid: Joi.string().required()
            }
        },
    },
    handler: controller.task.list
}, {
    path: '/task/delete',
    method: 'GET',
    config: {
        description: '删除我的任务',
        notes: 'task delete',
        tags: ['task'],
        validate: {
            query: {
                uid: Joi.string().required(),
                tid: Joi.string().required()
            }
        },
    },
    handler: controller.task.deleteOne
},{
    path: '/task/add',
    method: 'POST',
    config: {
        description: '创建任务',
        notes: 'task',
        tags: ['task']
    },
    handler: controller.task.add
}]