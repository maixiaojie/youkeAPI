let models = require('../models');
const Op = models.Op;

let operation = {
    async praise(req) {
        let rs = await models.collection_praise.create({
            id: '123asd',
            uid: req.query.uid,
            operation_type: '1',
            content_type: '1',
            tid: req.query.tid,
            flag: '1',
            ctime: new Date().getTime()
        })
        return {rs}
    }
}

module.exports = operation;