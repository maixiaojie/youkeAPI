module.exports = function(sequelize, DataTypes) {
	var courseIntroduce = sequelize.define("course_introduce", {
        course_id: DataTypes.STRING,
        course_introduce: DataTypes.STRING
	}, {
		freezeTableName: true,
		timestamps: false
    });
    // If you don't define a primaryKey then sequelize uses id by default.
    courseIntroduce.removeAttribute('id')

	return courseIntroduce;
}