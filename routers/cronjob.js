let controller = require('../controllers')
const Joi = require('joi')

module.exports = [
    {
        path: '/spider_articles',
        method: 'GET',
        config: {
            description: '爬虫：web article',
            notes: 'web',
            tags: ['spider'],
            validate: {
            }
        },
        handler: controller.cronjob.spider_articles
    }
]