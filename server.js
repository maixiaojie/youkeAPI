const Hapi = require('hapi');

let connnectionOptions = {
	port: 7777,
	host: 'localhost'
};

const server = new Hapi.server(connnectionOptions);


module.exports = server;