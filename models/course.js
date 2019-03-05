module.exports = function(sequelize, DataTypes) {
	var course = sequelize.define("course", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		course_name: DataTypes.STRING,
		img: DataTypes.STRING,
		learning_time: DataTypes.STRING
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return course;
}