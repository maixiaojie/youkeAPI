let controller = require('../controllers')

module.exports = [{
    path: '/chatmsg/list/{pageNum}/{pageSize}',
    method: 'GET',
    config: {
        description: '聊天室消息列表',
        notes: 'chatmsg list',
        tags: ['chatmsg']
    },
    handler: controller.chat_msg.list
}]