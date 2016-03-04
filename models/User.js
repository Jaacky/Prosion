var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose'),
	bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	email : { type: String, required: true, unique: true },
	password : { type: String, required: true },
	dateCreated : { type: Date, required: true, default: Date.now },
	name : { type: String },
	description : { type: String, maxlength: 500 },
	image : { type: String, default: '../../images/avatar.png' },
	superAdmin: { type: Boolean, default: false },
	admin: { type: Boolean, default: false },
	followers : [ { type: Schema.Types.ObjectId, ref: 'User' } ],
	following : [ { type: Schema.Types.ObjectId, ref: 'User' } ],
	graphs : [ { type: Schema.Types.ObjectId, ref: 'Graph' } ],
	fusions : [ { type: Schema.Types.ObjectId, ref: 'Fusion' } ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);