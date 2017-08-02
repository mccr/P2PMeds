var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RouteSchema = new Schema({
	'from' : String,
	'to' : String,
	'date' : Date,
	'creator_id' : { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Route', RouteSchema);
