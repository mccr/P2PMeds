const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const RatingSchema = require('../Rating/RatingModel').schema;

var UserSchema = new Schema({
	'username' : String,
	'password': String,
	'profilePic' : String,
	'email' : String,
	'sendEvent' : [],
	'rating' : [RatingSchema],
	'badge' : []
});

module.exports = mongoose.model('User', UserSchema);
