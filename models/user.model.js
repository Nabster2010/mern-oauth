const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	googleId: String,
	displayName: String,
	avatar: String,
});

module.exports = User = mongoose.model('user', userSchema);
