let controller = require('../controllers')
const Joi = require('joi')

module.exports = [{
    path: '/card/list/{pageNum}/{pageSize}',
    method: 'GET',
    config: {
        description: '获取打卡列表',
        notes: 'card list',
        tags: ['card'],
        validate: {
            query: {
                uid: Joi.string().required()
            }
        }
    },
    handler: controller.card.list
}, {
    path: '/card/add',
    method: 'POST',
    config: {
        description: '打卡',
        notes: 'card',
        tags: ['card']
    },
    handler: controller.card.add
}, {
    path: '/card/status',
    method: 'GET',
    config: {
        description: '获取今天打卡状态',
        notes: 'card',
        tags: ['card'],
        validate: {
            query: {
                uid: Joi.string().required()
            }
        },
    },
    handler: controller.card.hasCardTody
}, {
    path: '/card/todaytotal',
    method: 'GET',
    config: {
        description: '获取今天打卡总人数',
        notes: 'card',
        tags: ['card'],
    },
    handler: controller.card.todayCardNumber
}]