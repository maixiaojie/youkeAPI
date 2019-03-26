let controller = require('../controllers')
const Joi = require('joi')

module.exports = [
    {
        path: '/article/list/{pageNum}/{pageSize}',
        method: 'GET',
        config: {
            description: '根据一级分类获取文章列表',
            notes: 'article list',
            tags: ['article'],
            validate: {
                query: {
                    type: Joi.string().required()
                }
            }
        },
        handler: controller.article.listByType
    },{
        path: '/article/detail/{id}',
        method: 'GET',
        config: {
            description: '根据id获取文章所有信息',
            notes: 'article detail',
            tags: ['article'],
            validate: {
                
            }
        },
        handler: controller.article.detail
    },
]