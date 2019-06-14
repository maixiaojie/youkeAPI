let moment = require('moment')
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
		ctime: {
			type: DataTypes.DATE,
			get() {
				return moment(this.getDataValue('ctime')).format('YYYY-MM-DD HH:mm:ss')
			}
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return card;
}