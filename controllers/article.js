let models = require('../models');
const Op = models.Op;
const sequelize = models.sequelize;
let article = {
    async listByType(req) {
        let type = req.query.type;
        var pageSize = parseInt(req.params.pageSize) || 1;
		var pageNum = parseInt(req.params.pageNum) || 10;
        let rs = await models.article.findAll({
            attributes: ['id', 'title', 'f_type', 's_type', 'time'],
            where: {
                f_type: type
            },
            order: [
                [sequelize.fn('date', sequelize.col('time')), 'desc'],
                ['href', 'desc']
            ],
            limit: pageSize,
            offset: (pageNum - 1) * pageSize
        })
        return {
            code: 1,
            data: rs,
            msg: '查询成功'
        }
    },

    async search(req) {
        let keyword = req.query.keyword;
        var pageSize = parseInt(req.params.pageSize) || 1;
        var pageNum = parseInt(req.params.pageNum) || 10;
        let rs = await models.article.findAll({
            attributes: ['id', 'title', 'f_type', 's_type', 'time'],
            where: {
                title: {
                    [Op.like]: '%' + keyword + '%'
                }
            },
            order: [
                [sequelize.fn('date', sequelize.col('time')), 'desc'],
                ['href', 'desc']
            ],
            limit: pageSize,
            offset: (pageNum - 1) * pageSize
        })
        return {
            code: 1,
            data: rs,
            msg: '查询成功'
        }
    },

    async detail(req) {
        let id = parseInt(req.params.id) || 1;
        let rs = await models.article.find({
            where: {
                id
            }
        });
        return {
            code: 1,
            data: rs,
            msg: '查询成功'
        }
    }
}

module.exports = article