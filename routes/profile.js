var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var Analytics = require('../models/Analytics.js');
var multer = require('multer');
var upload = multer({dest: './public/images/uploads'});
var fs = require('fs');

/* GET users listing. */

router.get('/', function(req, res) {
	console.log("at profile");
	if (req.user) { 
		res.render('profile', {user: JSON.stringify(req.user), otherUser: false});
	}
	else {
		res.redirect('/');
	}
});

router.get('/edit', function(req, res) {
	if (req.user) {
		res.render('edit', {user: JSON.stringify(req.user)});
	} else {
		res.redirect('/');
	}
});

router.post('/edit', upload.single('image'), function(req, res, next) {
	User.findById(req.body._id, function(err, user) {
		if (err) console.log(err);
		if (req.body.passwordFlag == 'false') {
			user.name = req.body.displayName;
			user.description = req.body.description;
			if (req.file) {
				user.image = req.file.path.substring(7);
			}
			user.save(function(err, user) {
				if (err) {
					console.log(err);
					res.render('edit', {user: JSON.stringify(user), message: 'Problem updating your profile, please try again.'});
				} else {
					res.render('edit', {user: JSON.stringify(user), message: 'Updated your profile!'});
				}
			});
		} else {
			if (req.body.newPassword != req.body.confirmPassword) {
				res.render('edit', {user: JSON.stringify(user), message: 'Passwords do not match.'});
			} else {
				user.password = req.body.newPassword;
				user.save(function(err, user) {
					if (err) {
						console.log(err);
						res.render('edit', {user: JSON.stringify(user), message: 'Problem updating your profile, please try again.'});
					} else {
						res.render('edit', {user: JSON.stringify(user), message: 'Updated your password!'});
					}
				});
			}
		}
	});
});

router.get('/:userId', function(req, res, next) {
	if (req.user) {
		console.log(req.path);
		Analytics.update({page: req.path}, {page: req.path, $inc: { viewCount: 1}}, { upsert: true }, function(err, page) {
			console.log(page);
		});
		User.findOne({ _id : req.params.userId }, function(err, user) {
			if (err) console.log(err);
			if (!user) {
				console.log("Profile doesn't exist");
				res.redirect('/landing');
			}
			res.render('profile', { user: JSON.stringify(req.user), otherUser: JSON.stringify(user) });
		});
	} else {
		res.redirect('/');
	}
  	// res.send(req.params.userId);
});

router.post('/delete', function(req, res, next) {
	User.remove( { _id: req.body._id }, function(err) {
		res.redirect('/landing');
	});
});

router.post('/toggleAdmin', function(req, res, next) {
	User.findOne({ _id: req.body._id }, function(err, user) {
		if (err) console.log(err);
		if (!user) {
			res.redirect('/landing');
		}
		var admin = user.admin;
		user.admin = !admin;
		user.save(function(err, user) {
			if (err) res.redirect('/profile/' + req.body._id);
			else {
				res.redirect('/profile/' + req.body._id);
			}
		});
	});
});

module.exports = router;
