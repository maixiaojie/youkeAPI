module.exports = function(sequelize, DataTypes) {
	var course = sequelize.define("article", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		title: DataTypes.STRING,
		f_type: DataTypes.STRING,
		f_type: DataTypes.STRING,
		content: DataTypes.BLOB,
		time: DataTypes.STRING
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return course;
}