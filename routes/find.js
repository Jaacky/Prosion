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
		next();
	}
});

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

module.exports = router;