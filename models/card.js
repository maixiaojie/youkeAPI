module.exports = function(sequelize, DataTypes) {
	var card = sequelize.define("card", {
		cardid: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		uid: DataTypes.STRING,
		title: DataTypes.STRING,
		content: DataTypes.STRING,
		open: DataTypes.BLOB,
		ctime: DataTypes.STRING
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return card;
}