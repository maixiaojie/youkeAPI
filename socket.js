var socket = {
    init(io) {
        var that = this;
        that.io = io;
        that.io.on('connection', (socket) => {
            console.log(`${socket.id} connected`);
            that.listener(socket);
        })
    },
    listener(socket) {
        socket.on('test', function(data) {
            console.log(data)
        })
    }
}

module.exports = socket;