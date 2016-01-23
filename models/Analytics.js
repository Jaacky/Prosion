var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var analyticsSchema = new Schema({
	page : { type: String, required: true, unique: true },
	viewCount : { type: Number, default: 0 }
}); 

module.exports = mongoose.model('Analytics', analyticsSchema);