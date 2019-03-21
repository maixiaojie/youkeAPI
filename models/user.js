module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define("user", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		openid: DataTypes.STRING,
		avatar_url: DataTypes.STRING,
		nick_name: DataTypes.STRING,
		city: DataTypes.STRING,
		country: DataTypes.STRING,
		province: DataTypes.STRING,
		language: DataTypes.STRING,
        gender: DataTypes.STRING,
        ctime: DataTypes.DATE,
        uptime: DataTypes.DATE
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return user;
}