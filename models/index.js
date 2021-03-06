const Sequelize = require('sequelize');
const config = require('../config/database')
const fs = require('fs')
const path = require('path')
const Op = Sequelize.Op
let db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql',
	operatorAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	timezone: '+08:00' //东八时区
})

fs.readdirSync(__dirname).filter((file) => {
	return (file.indexOf('.') !== 0) && (file != 'index.js');
}).forEach((file) => {
	var model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

module.exports = db;