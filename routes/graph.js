var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var User = require('../models/User.js');
var Graph = require('../models/Graph.js');
var moment = require('moment');

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
		res.render('graph', { graph: JSON.stringify(graph), graphName: graph.name, graphId: req.params.id });
	});
});

router.post('/input', function(req, res) {
	Graph.findOne({ _id: req.body.id }, function(err, graph) {
		console.log("error: " + err);
		console.log(graph);
		var dataPoint = [
			parseInt(moment(req.body.date, 'ddd MMM D, YYYY').format('x')),
			parseInt(req.body.value)
		];
		console.log(dataPoint);
		graph.data.push(dataPoint);
		console.log(graph.data);
		graph.save(function(err, graph) {
			if (err) {
				console.log("save error: " + err);
			} else {
				console.log("after save graph: ", graph);
				res.redirect('/graph/' + req.body.id);
			}
		});
	});
});

router.post('/updateGraphName', function(req, res) {
	Graph.findOne({ _id : req.body.id }, function(err, graph) {
		if (err) console.log(err);
		else {
			graph.name = req.body.graphName;
			graph.save(function(err, graph) {
				if (err) {
					console.log("save error: " + err);
				} else {
					console.log("Updated graph name");
						var response = {
						    status  : 200,
						    success : 'Updated Successfully',
						    graphName : req.body.graphName
						}
					res.json({"graphName" : req.body.graphName});
				}
			});
		}
	});
});

module.exports = router;