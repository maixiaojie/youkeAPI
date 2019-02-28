const Hapi = require('hapi');

let connnectionOptions = {
	port: 3333,
	host: 'localhost'
};

const server = new Hapi.server(connnectionOptions);


module.exports = server;