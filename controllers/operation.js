let models = require('../models');
let common = require('../common/common')
const Op = models.Op;

let operation = {
    /**
     * 点赞/取消点赞
     * @param {*} req 
     *  
     * operation_type: 1 收藏  2 点赞
     * content_type: 1 视频  2 文章
     * flag: 1 有效  0 无效 
     */
    async praise(req) {

        let data = await models.collection_praise.find({
            where: {
                uid: req.query.uid,
                tid: req.query.tid,
                content_type: req.query.ct,
                operation_type: '2'
            }
        })
        if(data) {
            // record is exist 
            var flag = data.flag;
            let nflag = flag == 1? 0 : 1;
            let up = await models.collection_praise.update({
                    flag: nflag
                }, {
                    where: {
                    uid: req.query.uid,
                    tid: req.query.tid,
                    content_type: req.query.ct,
                    operation_type: '2'
                }
            });
            var msg = '';
            if(nflag == 1) {
                msg = '点赞成功'
            }else {
                msg = '取消点赞成功'
            }
            return {
				code: 1,
				data: {flag: nflag},
				msg
			}
        }else {
            //record is not exist
            let uuid = 'oper' + common.uuid(60);
            let rs = await models.collection_praise.create({
                id: uuid,
                uid: req.query.uid,
                operation_type: '2',
                content_type: req.query.ct,
                tid: req.query.tid,
                flag: '1',
                ctime: new Date().getTime()
            });
            return {
				code: 1,
				data: {flag: 1},
				msg: '点赞成功'
			}
        }
    },
    /**
     * 收藏/取消收藏
     * @param {*} req 
     *  
     * operation_type: 1 收藏  2 点赞
     * content_type: 1 视频  2 文章
     * flag: 1 有效  0 无效 
     */
    async collection(req) {

        let data = await models.collection_praise.find({
            where: {
                uid: req.query.uid,
                tid: req.query.tid,
                content_type: req.query.ct,
                operation_type: '1'
            }
        })
        if(data) {
            // record is exist 
            var flag = data.flag;
            let nflag = flag == 1? 0 : 1;
            let up = await models.collection_praise.update({
                    flag: nflag
                }, {
                    where: {
                    uid: req.query.uid,
                    tid: req.query.tid,
                    content_type: req.query.ct,
                    operation_type: '1'
                }
            });
            var msg = '';
            if(nflag == 1) {
                msg = '收藏成功'
            }else {
                msg = '取消收藏成功'
            }
            return {
				code: 1,
				data: {flag: nflag},
				msg
			}
        }else {
            //record is not exist
            let uuid = 'oper' + common.uuid(60);
            let rs = await models.collection_praise.create({
                id: uuid,
                uid: req.query.uid,
                operation_type: '1',
                content_type: req.query.ct,
                tid: req.query.tid,
                flag: '1',
                ctime: new Date().getTime()
            });
            return {
				code: 1,
				data: {flag: 1},
				msg: '收藏成功'
			}
        }
    }
}

module.exports = operation;