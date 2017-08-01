var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const SendEventSchema = require('../SendEvent/SendEventModel').schema;

var RouteSchema = new Schema({
	'from' : String,
	'to' : String,
	'date' : Date,
	'creator_id' : String,
	'sendEvent' : [SendEventSchema]
});

module.exports = mongoose.model('Route', RouteSchema);
