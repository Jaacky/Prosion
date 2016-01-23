var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var graphSchema = new Schema({
	owner: { Schema.ObjectId, ref: 'User' }
	dateCreated : { type: Date, required: true, default: Date.now },
	data : [ Number ]
});

module.exports = mongoose.model('Graph', graphSchema);