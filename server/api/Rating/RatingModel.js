var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RatingSchema = new Schema({
	'stars' : Number,
	'comment' : String,
	'ratedUser_id': { type: Schema.Types.ObjectId, ref: 'User', required: true },
	'user_id' : { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Rating', RatingSchema);
