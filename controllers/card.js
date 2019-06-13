let models = require('../models');
let common = require('../common/common')
const Op = models.Op;
const sequelize = models.sequelize;
let card = {
    async lists(req) {
        var pageSize = parseInt(req.params.pageSize) || 1;
        var pageNum = parseInt(req.params.pageNum) || 10;
        var sql = `SELECT card.*, u.nick_name, u.avatar_url from card INNER JOIN user as u on card.uid = u.id where card.open = '1'  ORDER BY card.ctime DESC limit ${pageSize} offset ${(pageNum - 1) * pageSize}` ;
        let data = await sequelize.query(sql, {raw: false, type: sequelize.QueryTypes.SELECT});
        var totalSql = `SELECT count(cardid) as total FROM card where card.open = '1'`;
        let total = await sequelize.query(totalSql, {raw: false, type: sequelize.QueryTypes.SELECT});
        return {
            code: 1,
            data: data,
            total,
            msg: '查询成功'
        }
    },
    async list(req) {
        let uid = req.query.uid;
        var pageSize = parseInt(req.params.pageSize) || 1;
		var pageNum = parseInt(req.params.pageNum) || 10;
        let data = await models.card.findAll({
            where: {
                uid
            },
            order: [['ctime', 'DESC']],
            limit: pageSize,
            offset: (pageNum - 1) * pageSize,
            
        });
        let total = await models.card.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('cardid')), 'cardTotal']],
            where: {
                uid
            }
        });
        return {
            code: 1,
            data: data,
            total,
            msg: '查询成功'
        }
    },
    async hasCardTody(req) {
        let uid = req.query.uid;
        let hasCardTody = await models.card.findOne({
            where: {
                uid, 
                where: sequelize.where(sequelize.fn('to_days', sequelize.col('ctime')), sequelize.fn('to_days', new Date()))
            }
        });
        return {
            code: 1,
            data: hasCardTody,
            msg: '查询成功'
        }
    },
    async todayCardNumber(req) {
        let data = await models.card.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('cardid')), 'cardTotal']],
            where: {               
                where: sequelize.where(sequelize.fn('to_days', sequelize.col('ctime')), sequelize.fn('to_days', new Date()))
            }
        });
        return {
            code: 1,
            data: data,
            msg: '查询成功'
        }
    },
    async add(req) {
        let body = req.payload;
        let cardid = 'card' + common.uuid(60);
        let uid = body.uid;
        let title = body.title;
        let content = body.content;
        let open = body.open;
        let hasCardTody = await models.card.findOne({
            where: {
                uid, 
                where: sequelize.where(sequelize.fn('to_days', sequelize.col('ctime')), sequelize.fn('to_days', new Date()))
            }
        });
        if(hasCardTody == null) {
            // 未打卡
            let createRs = await models.card.create({
                cardid,
                uid,
                title,
                content,
                open
            });
            return {
                code: 1,
                data: null,
                msg: '打卡成功'
            }
        }else {
            // 已经打卡
            return {
                code: 0,
                data: null,
                msg: '您今天已经打过卡了'
            }
        }
    }
}

module.exports = card