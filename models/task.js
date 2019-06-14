let moment = require('moment')
module.exports = function(sequelize, DataTypes) {
	var task = sequelize.define("task", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		uid: DataTypes.STRING,
		title: DataTypes.STRING,
		content: DataTypes.STRING,
		icon: DataTypes.STRING,
		is_active: DataTypes.STRING,
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

	return task;
}