const common = require('./common/common')
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
    listener(socket) {
        var that = this;
        socket.on('msg', function(data) {
            console.log(data)
            // socket.broadcast.emit('msgs', data);
            that.io.emit('msgs', data)
        })
        socket.on('login', function(data) {
            data.socketid = socket.id;
            that.userList.push(data)
            socket.broadcast.emit('total', {total: that.total, newUser: data, userList: that.userList});
        })
        socket.on('disconnect', function() {
            that.total--;
            let socketid = socket.id;
            let leaveUser = that.userList.filter(item => item.socketid == socketid);
            common.removeByValue(that.userList, 'socketid', socketid)
            console.log(`${socket.id} connected`);
            socket.broadcast.emit('leaveroom', {total: that.total, leaveUser, userList: that.userList});
        })
    }
}

module.exports = socket;