let models = require('../models');
let common = require('../common/common')
let WXBizDataCrypt = require('../common/WXBizDataCrypt')
const Wreck = require('wreck')
const CryptoJS = require('crypto-js')
const Op = models.Op;

let operation = {
    // 用户登录
    async login(req) {
        let appId = 'wx475323d626427033';
        let appSecret = 'bfe85d14e4a01fe3d26dd340f51edfc3'
        let body = req.payload;
        let encryptedData = body.encryptedData;
        let iv = body.iv;
        let signature = body.signature;
        let rawData = body.rawData;
        let code = body.code;
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
        const {res, payload} = await Wreck.get(url);
        let wxrs = JSON.parse(payload.toString());
        if(wxrs && wxrs.session_key) {
            let session_key = wxrs.session_key;
            let openid = wxrs.openid;
            // 校验数据是否合法，比较两个sign是否一致
            // var sign2 = CryptoJS.HmacSHA1(rawData, session_key).toString()
            // console.log(signature, sign2)
            var pc = new WXBizDataCrypt(appId, session_key)
            var data = pc.decryptData(encryptedData, iv)
            let userinfo = await models.user.findOne({
                where: {
                    openid
                }
            });
            console.log(userinfo)
            if(userinfo) {
                // update this record
                let updateRs = await models.user.update({                    
                    avatar_url: data.avatarUrl,
                    nick_name: data.nickName,
                    city: data.city,
                    country: data.country,
                    province: data.province,
                    language: data.language,
                    gender: data.gender
                }, {
                    where: {
                        openid
                    }
                });
                return {
                    code: 1,
                    data: {
                        userid: userinfo.id
                    },
                    msg: '登录成功'
                }
            }else {
                // add a new record
                let uuid = 'user' + common.uuid(60);
                let createRs = await models.user.create({
                    id: uuid,
                    openid,
                    avatar_url: data.avatarUrl,
                    nick_name: data.nickName,
                    city: data.city,
                    country: data.country,
                    province: data.province,
                    language: data.language,
                    gender: data.gender,
                    ctime: new Date().getTime()
                });
                return {
                    code: 1,
                    data: {
                        userid: createRs.id
                    },
                    msg: '登录成功'
                }
            }
            
        }else {
            return {
                code: 0,
                data: null,
                msg: '登录失败，请重试'
            }
        }
    },
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