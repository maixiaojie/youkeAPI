module.exports = function(sequelize, DataTypes) {
	var user_search_record = sequelize.define("user_search_record", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		user_id: DataTypes.STRING,
		keyword: DataTypes.STRING,
		time: DataTypes.DATE
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return user_search_record;
}