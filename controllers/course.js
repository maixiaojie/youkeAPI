let models = require('../models');

let course = {
	async getOne(req) {
		let info = await models.course.findOne({
			where: {
				id: req.query.id
			}
		});
		return {data: info}
	}
}

module.exports = course;