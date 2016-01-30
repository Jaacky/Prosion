var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var User = require('../models/User.js');
var Graph = require('../models/Graph.js');
var Fusion = require('../models/Fusion.js');
var Analytics = require('../models/Analytics.js');
var superAdmin = require('../models/first.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	function(email, password, done) {
		User.findOne({email: email}, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				console.log('Incorrect e-mail.');
				return done(null, false, { message: 'Incorrect e-mail.'});
			}
			console.log("Password: " + user.password + " / input: " + password);
			if (user.password != password) {
				console.log('Incorrect password.');
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('IP ADDRESS OF USER: ');
	 var ip = req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress ||
     req.headers['x-forwarded-for'];
     console.log(ip);
	if (req.user) {
		res.redirect('/dashboard');
	}
	res.render('index');
});

router.get('/login', function(req, res) {
	if (req.user) {
		res.redirect('/dashboard');
	}
	else  {
		res.render('login', {message: req.flash('error')});
	}
});

router.post('/login', 
	passport.authenticate('local', { successRedirect: '/dashboard',
									 failureRedirect: '/login',
									 failureFlash: true })
);

router.get('/logout', function(req, res) {
	req.session.destroy(function(err){
		res.redirect('/');
	});
});

router.get('/signup', function(req, res, next) {
	res.render('signup');
});

router.post('/signup', function(req, res) {
	if (req.body.password != req.body.confirmPassword) {
		req.flash('error', 'Password does not match');
		res.render('signup', {message: req.flash('error')});
	}

	else if (!emailRegex.test(req.body.email)) {
		req.flash('error', 'Not a valid E-mail.');
		res.render('signup', {message: req.flash('error')});
	} else {
		User.findOne({email: req.body.email}, function(err, user) {
			if (err) console.log("err finding during signup ", err);
			else {
				if (!user) {
					superAdmin.set(function() {
						if (!superAdmin.exists()) {
							var newUser = new User({
								email: req.body.email,
								password: req.body.password,
								superAdmin: true,
								admin: true
							});
						} else {
							var newUser = new User({
								email: req.body.email,
								password: req.body.password
							});
						}

						newUser.save(function(err, data) {
							if (err) {
								console.log(err);
								console.log(data);
								res.render('signup', {message: 'Problem signing up, please try again'});
							} else {
								console.log("signup successful ", data);
								passport.authenticate('local')(req, res, function() {
									res.redirect('/dashboard');
								});
							}
						});
					});
				} else {
					res.render('signup', {message: 'Email already in use'});
				}
			}
		});
	}
});

router.get('/dashboard', function(req, res) {
	if (req.user) { 
		// User.find({}, function(err, users) {
		// 	//res.render('dashboard', { user: JSON.stringify(req.user), users: JSON.stringify(users) }); 
		// 	res.render('dashboard', { user: JSON.stringify(req.user), users: JSON.stringify(users) }); 
		// });

		User.findOne({_id: req.user._id}, function(err, user) {
			Graph.find({
				_id : { $in : user.graphs}
			}, function(err, graphs) {
				// console.log(graphs);
				// console.log(user);
				Fusion.find({
					owners : user._id
				}, function(err, fusions) {
					console.log(fusions);
					res.render('dashboard', { user:JSON.stringify(user), graphs: JSON.stringify(graphs), fusions: JSON.stringify(fusions) });
				});
			});
		});
	}
	else {
		res.redirect('/');
	}
	//res.redirect('/profile');
});

router.post('/createGraph', function(req, res) {
	console.log('creating graph!');
	console.log(req.user);
	console.log(req.body.graphName);

	User.findOne({_id: req.user._id}, function(err, user) {
		if (err) {
			console.log(err);
			res.redirect('/dashboard');
		} else {
			var newGraph = new Graph({
				owner: user._id,
				name: req.body.graphName,
				data: []
			});
			console.log(newGraph);
			newGraph.save(function(err, graph) {
				if (err) {
					console.log(err);
					res.redirect('/dashboard');
				} else {
					console.log('successfully created new graph');
					user.graphs.push(graph._id);
					user.save(function(err) {
						if (err) {
							console.log(err);
							res.redirect('/dashboard');
						} else {
							console.log('successfully updated user');
							res.redirect('/dashboard');
						}
					})
				}
			});
		}
	});		
});

router.get('/analytics', function(req, res) {
	if (req.user) {
		if (req.user.admin) {
			Analytics.find({}, function(err, data) {
				//res.send(data);
				res.render('analytics', {user: JSON.stringify(req.user), data: JSON.stringify(data)});
			});
		} else {
			res.redirect('/');
		}
	} else {
		res.redirect('/');
	}
});

module.exports = router;