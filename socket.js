var socket = {
    total: 0,
    init(io) {
        var that = this;
        that.io = io;
        io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
        io.set('origins', '*:*');
        that.io.on('connection', (socket) => {
            console.log(`${socket.id} connected`);
            that.total++;
            console.log(`当前共有${that.total}人在线`)
            socket.emit('total', {total: that.total})
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
        socket.on('disconnect', function() {
            that.total--;
            console.log('user disconnected')
            console.log(`当前共有${that.total}人在线`)
        })
    }
}

module.exports = socket;