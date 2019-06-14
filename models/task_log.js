let moment = require('moment')
module.exports = function(sequelize, DataTypes) {
	var task_log = sequelize.define("task_log", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		uid: DataTypes.STRING,
		tid: DataTypes.STRING,
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

	return task_log;
}