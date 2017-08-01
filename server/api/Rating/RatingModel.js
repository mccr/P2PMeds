var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RatingSchema = new Schema({
	'stars' : Number,
	'comment' : String,
	'creator_id' : String
});

module.exports = mongoose.model('Rating', RatingSchema);
