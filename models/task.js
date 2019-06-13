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
		ctime: DataTypes.STRING
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return task;
}