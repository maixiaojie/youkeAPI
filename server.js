const Hapi = require('hapi');
let connnectionOptions = {
	port: 7777,
	host: 'localhost'
};

let server = new Hapi.server(connnectionOptions);
// server.events.on({name: 'request', channels: 'error'}, fundebug.HapiErrorHandler);
// server.events.on("response", fundebug.HapiErrorHandler);


module.exports = server;