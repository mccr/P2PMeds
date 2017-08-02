var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RatingSchema = new Schema({
	'stars' : Number,
	'comment' : String,
	'rated_id': { type: Schema.Types.ObjectId, ref: 'User', required: true },
	'creator_id' : { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Rating', RatingSchema);
