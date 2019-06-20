let moment = require('moment')
module.exports = function(sequelize, DataTypes) {
	var chat_msg = sequelize.define("chat_msg", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		userid: DataTypes.STRING,
		name: DataTypes.STRING,
		avatar: DataTypes.STRING,
		msg: DataTypes.STRING,
		type: DataTypes.STRING,
		ctime: {
			type: DataTypes.DATE,
			get() {
				return moment(this.getDataValue('ctime')).format('YYYY-MM-DD HH:mm:ss')
			}
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return chat_msg;
}