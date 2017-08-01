var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SendEventSchema = new Schema({
	'creator_id' : { type: Schema.Types.ObjectId, ref: 'User', required: true },
	'status' : {
        type: String,
        enum: ['pending confirmation', 'received', 'in transit', 'out for delivery', 'delivered', 'cancel'],
        required: true
        }
});

module.exports = mongoose.model('SendEvent', SendEventSchema);
