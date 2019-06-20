let models = require('../models');
const sequelize = models.sequelize;
let chat_msg = {
    async list(req) {
        var pageSize = parseInt(req.params.pageSize);
        var pageNum = parseInt(req.params.pageNum);
        var sql = `SELECT msg.id, msg.type, msg.msg,  u.nick_name as name, u.avatar_url as avatar, msg.ctime, u.id as userid  FROM chat_msg as msg INNER JOIN user as u ON msg.userid = u.id ORDER BY msg.ctime DESC LIMIT ${pageSize} OFFSET ${(pageNum - 1) * pageSize}`;
        let data = await sequelize.query(sql, {raw: false, type: sequelize.QueryTypes.SELECT});        
        return {
            code: 1,
            data: data,
            msg: '查询成功'
        }
    }
};
module.exports = chat_msg;