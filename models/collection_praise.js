module.exports = function(sequelize, DataTypes) {
	var course = sequelize.define("collection_praise", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		uid: {
			type: DataTypes.STRING
		},
		operation_type: {
			type: DataTypes.STRING
		},
		content_type: {
			type: DataTypes.STRING
		},
		tid: {
			type: DataTypes.STRING
		},
		flag: {
			type: DataTypes.STRING
		},
		ctime: {
			type: DataTypes.DATE
		},
		uptime: {
			type: DataTypes.DATE
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return course;
}