let models = require('../models');
let common = require('../common/common')
const Op = models.Op;
const sequelize = models.sequelize;
let task = {
    async list(req) {
        let uid = req.query.uid;
        let data = await models.task.findAll({
            where: {
                uid,
                is_active: '1'
            },
            order: [['ctime', 'DESC']]
        });
        return {
            code: 1,
            data: data,
            msg: '查询成功'
        }
    },
    async deleteOne(req) {
        let uid = req.query.uid;
        let tid = req.query.tid;
        let data = await models.task.findOne({
            where: {
                uid,
                id: tid,
                is_active: '1'
            }
        });
        if(data) {
            // 有该条数据
            let res  = await models.task.update({
                is_active: '0'
            }, {
                where: {
                    uid,
                    id: tid
                }
            })
            console.log(res);
            return {
                code: 1,
                data: res,
                msg: '删除成功'
            }
        }else {
            return {
                code: 0,
                data: data,
                msg: '没有该记录'
            }
        }
    },
    async add(req) {
        let body = req.payload;
        let id = 'task' + common.uuid(60);
        let uid = body.uid;
        let title = body.title;
        let content = body.content;
        let icon = body.icon;
        let is_active = '1';
        let createRs = await models.task.create({
            id,
            uid,
            title,
            icon,
            content,
            is_active
        });
        if(createRs) {
            return {
                code: 1,
                data: null,
                msg: '创建成功'
            }
        }else {
            return {
                code: 0,
                data: null,
                msg: '创建失败'
            }
        }
        
    }
}

module.exports = task