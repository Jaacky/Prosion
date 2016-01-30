var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var fusionSchema = new Schema({
	owners : [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
	dateCreated : { type: Date, required: true, default: Date.now },
	name : { type: String, required: true, default: Date.now },
	graphs : { type: Schema.Types.Mixed, required: true } // [ { id: userID, graphs: [graphID, ...] }, ... ]
});

module.exports = mongoose.model('Fusion', fusionSchema);