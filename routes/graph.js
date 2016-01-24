var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var User = require('../models/User.js');
var Graph = require('../models/Graph.js');

/* Check if user is logged in */
router.use(function(req, res, next) {
	if (!req.user) {
		res.redirect('/login');
	} else {
		next();
	}
});

router.get('/:id', function(req, res) {
	Graph.findOne({ _id: req.params.id }, function(err, graph) {
		res.render('graph', { graph: JSON.stringify(graph), graphName: graph.name });
	});
});

module.exports = router;