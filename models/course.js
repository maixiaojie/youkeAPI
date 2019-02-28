module.exports = function(sequelize, DataTypes) {
	var course = sequelize.define("course", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		course_name: DataTypes.STRING
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return course;
}