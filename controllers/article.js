let models = require('../models');
const Op = models.Op;

let article = {
    async listByType(req) {
        let type = req.query.type;
        var pageSize = parseInt(req.params.pageSize) || 1;
		var pageNum = parseInt(req.params.pageNum) || 10;
        let rs = await models.article.findAll({
            attributes: ['id', 'title', 's_type', 'time'],
            where: {
                f_type: type
            },
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