module.exports = function(sequelize, DataTypes) {
	var task_log = sequelize.define("task_log", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		uid: DataTypes.STRING,
		tid: DataTypes.STRING,
		ctime: DataTypes.STRING
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return task_log;
}