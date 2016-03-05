var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var async = require('async');
var User = require('../models/User.js');
var Graph = require('../models/Graph.js');
var Fusion = require('../models/Fusion.js');
var moment = require('moment');

/* Check if user is logged in */
router.use(function(req, res, next) {
	if (!req.user) {
		res.redirect('/login');
	} else {
		res.locals.user = JSON.stringify(req.user);
		next();
	}
});

// Need to refactor to /self/graphs/:name
router.post('/self/:name', function(req, res) {
	var regExp = new RegExp("^" + req.params.name, "i");
	Graph.find({ name: regExp, owner: req.user._id }, function(err, graphs) {
		if (err) console.log(err);
		else {
			console.log("found:", graphs);
			res.json(graphs);
		}
	});
});

router.get('/people/:name', function(req, res) {
	var regExp = new RegExp("^" + req.params.name, "i");
	User.find({ name: regExp }, function(err, users) {
		if (err) console.log(err);
		else {
			res.render('people', { people: JSON.stringify(users), search: req.params.name });
		}
	});
});

router.post('/people/:name', function(req, res) {
	console.log("searching", req.params.name);
	if (req.params.name != "-1") {
		var regExp = new RegExp("^" + req.params.name, "i");
	} else {
		var regExp = /.*/;
	}
	// User.find({ name: reqExp }, function(err, users) {
	// 	if (err) res.json(err);
	// 	else {
	// 		console.log("found", users);
	// 		res.json(users);
	// 	}
	// });
	User.find({ name: regExp }, function(err, users) {
		if (err) console.log(err);
		else {
			res.json(users);
		}
	});
});



module.exports = router;