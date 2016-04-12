var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
// var Analytics = require('../models/Analytics.js');
var multer = require('multer');
var upload = multer({dest: './public/images/uploads'});
var fs = require('fs');

/* Check if user is logged in */
router.use(function(req, res, next) {
	if (!req.user) {
		res.redirect('/login');
	} else {
		res.locals.userJSON = JSON.stringify(req.user);
		next();
	}
});

/* GET users listing. */
router.get('/', function(req, res) {
	console.log("at profile");
	if (req.user) { 
		res.render('profile', { user: req.user, userJSON: JSON.stringify(req.user), otherUserJSON: false});
	}
	else {
		res.redirect('/');
	}
});

router.get('/edit', function(req, res) {
	if (req.user) {
		res.render('edit', { user: req.user, userJSON: JSON.stringify(req.user)});
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
				/** NEED TO TAKE A LOOK AT THIS, NO NEED TO RENDER IN POST, SHOULD BE A REDIRECT NO? **/
				if (err) {
					console.log(err);
					res.render('edit', { user: user, userJSON: JSON.stringify(user), message: 'Problem updating your profile, please try again.'});
				} else {
					res.render('edit', { user: user, userJSON: JSON.stringify(user), message: 'Updated your profile!'});
				}
			});
		} 
		// else {
		// 	if (req.body.newPassword != req.body.confirmPassword) {
		// 		res.render('edit', {user: JSON.stringify(user), message: 'Passwords do not match.'});
		// 	} else {
		// 		user.password = req.body.newPassword;
		// 		user.save(function(err, user) {
		// 			if (err) {
		// 				console.log(err);
		// 				res.render('edit', {user: JSON.stringify(user), message: 'Problem updating your profile, please try again.'});
		// 			} else {
		// 				res.render('edit', {user: JSON.stringify(user), message: 'Updated your password!'});
		// 			}
		// 		});
		// 	}
		// }
	});
});

router.get('/:userId', function(req, res, next) {
	if (req.user) {
		User.findOne({ _id : req.params.userId }, function(err, user) {
			if (err) console.log(err);
			if (!user) {
				console.log("Profile doesn't exist");
				res.redirect('/dashboard');
			}
			res.render('userProfile', { user: req.user, userJSON: JSON.stringify(req.user), otherUser: user, otherUserJSON: JSON.stringify(user) });
		});
	} else {
		res.redirect('/');
	}
});

router.post('/follow', function(req, res) {
	if (req.user) {
		User.findOne({ _id: req.user._id }, function(err, followingUser) {
			if (err) console.log("User following cannot be found", err);
			// Eventually need to check if already followed just for error checkings sake
			// Also need to check if user is themself, shouldn't happen
			User.findOne({ _id: req.body._id }, function(err, followedUser) {
				if (err) console.log("User being followed cannot be found", err);

				followingUser.following.push(req.body._id);
				followingUser.save(function(err, user) {
					if (err) {
						console.log("Error saving user after following.");
					}
					console.log(user);
					followedUser.followers.push(req.user._id);
					followedUser.save(function(err, user) {
						if (err) console.log("Error saving user after being followed");
						res.redirect('/profile/' + req.body._id);
					});
					
				});
			});

		});
	} else {
		// Redirect to sign up page to follow
	}
});

router.post('/delete', function(req, res, next) {
	User.remove( { _id: req.body._id }, function(err) {
		res.redirect('/dashboard');
	});
});

module.exports = router;
