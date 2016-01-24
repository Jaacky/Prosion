var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var graphSchema = new Schema({
	owner: { type: Schema.Types.ObjectId, ref: 'User' },
	dateCreated : { type: Date, required: true, default: Date.now },
	name : { type: String, required: true, default: Date.now },
	data : [{ type: Schema.Types.Mixed, required: true, default: [] }]
});

module.exports = mongoose.model('Graph', graphSchema);