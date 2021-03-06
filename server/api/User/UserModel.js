const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'username' : String,
	'name': String,
	'password': String,
	'profilePic' : {type: String, default: '/images/empty-profile.png'},
	'email' : String,
	'ratingTotal': Number,
	'badges' : Array
});

module.exports = mongoose.model('User', UserSchema);
