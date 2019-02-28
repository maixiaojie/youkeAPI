const Sequelize = require('sequelize');
const config = require('../config/database')
const fs = require('fs')
const path = require('path')
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
	}
})

fs.readdirSync(__dirname).filter((file) => {
	return (file.indexOf('.') !== 0) && (file != 'index.js');
}).forEach((file) => {
	var model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;