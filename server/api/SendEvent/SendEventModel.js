var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SendEventSchema = new Schema({
	'route_id': { type: Schema.Types.ObjectId, ref: 'Route', required: true },
	'requestUser' : { type: Schema.Types.ObjectId, ref: 'User', required: true },
	'status' : {
        type: String,
        enum: ['pending confirmation', 'confirmed', 'Delivered to Carrier', 'in transit', 'delivered', 'rejected'],
        required: true
        }
});

module.exports = mongoose.model('SendEvent', SendEventSchema);
