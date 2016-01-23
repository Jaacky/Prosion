var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var graphSchema = new Schema({
	dateCreated : { type: Date, required: true, default: Date.now },
	data : [Number]
});

module.exports = mongoose.model('Graph', graphSchema);