module.exports = function(sequelize, DataTypes) {
	var chat_msg = sequelize.define("chat_msg", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		userid: DataTypes.STRING,
		name: DataTypes.STRING,
		avatar: DataTypes.STRING,
		msg: DataTypes.STRING,
		type: DataTypes.STRING,
		time: DataTypes.DATE
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return chat_msg;
}