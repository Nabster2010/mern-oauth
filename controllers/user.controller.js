const User = require('../models/user.model');
module.exports = {
	createUser: async (req, res, next) => {
		console.log(req.body);
		try {
			const user = await User.create({
				email: req.body.email,
				password: req.body.password,
			});
			return res.json(user);
		} catch (err) {
			console.log(err);
			res.status(500).send('server error');

			next(err); //todo error handler in server.js
		}
	},

	getAllUsers: async (req, res) => {
		try {
			const users = await User.find();
			return res.json(users);
		} catch (err) {
			console.log(err);
			res.status(500).send('server error');
			next(err); //todo error handler in server.js
		}
	},
};
