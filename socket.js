const common = require('./common/common')
let models = require('./models');
var socket = {
    total: 0,
    userList: [],
    init(io) {
        var that = this;
        that.io = io;
        io.use( (socket, next) => {
            let handshake = socket.handshake;
            handshake.secure = true;
            handshake.headers.origin = '*'
            // console.log(handshake)
            next()
        })
        io.origins((origin, callback) => {
            console.log(origin)
            callback(null, true)
        })
        // io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
        // io.set('origins', '*:*');
        that.io.on('connection', (socket) => {
            console.log(`${socket.id} connected`);
            that.total++;
            console.log(`当前共有${that.total}人在线`)
            socket.emit('total', {total: that.total, newUser: null, userList: that.userList})
            that.listener(socket);
        })
    },
    async saveMsg(data) {
        let res = await models.chat_msg.create(data);
    },
    listener(socket) {
        var that = this;
        socket.on('msg', function(data) {
            data.id = 'msg' + common.uuid(61);;
            console.log(data.name +':'+data.msg);
            // socket.broadcast.emit('msgs', data);
            that.io.emit('msgs', data);
            try {
                that.saveMsg(data);
            }catch(e) {
                console.log(e);
            }
            
            
        })
        socket.on('login', function(data) {
            data.socketid = socket.id;
            var isExist = that.userList.some(item => item.userid == data.userid );
            if(!isExist) {
                that.userList.push(data);
            }            
            socket.broadcast.emit('total', {total: that.total, newUser: data, userList: that.userList});
        })
        socket.on('disconnect', function() {
            that.total--;
            let socketid = socket.id;
            let leaveUser = that.userList.filter(item => item.socketid == socketid);
            common.removeByValue(that.userList, 'socketid', socketid)
            console.log(`${socket.id} connected`);
            socket.broadcast.emit('leaveroom', {total: that.total, leaveUser: leaveUser[0], userList: that.userList});
        })
    }
}

module.exports = socket;