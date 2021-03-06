const server = require('./server')
const plugins = require('./config/plugins')
const models = require('./models')
const socket = require('./socket')
const init = async () => {
    await server.register(plugins)
    await server.start();
    console.log(`server running at : ${server.info.uri}`);   
    const io = server.plugins.hapio.io; 
    socket.init(io);
}

init()
