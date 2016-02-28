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

router.get('/fuse', function(req, res) {
	console.log(req.user);
	res.render('fuse');
});

router.post('/fuse', function(req, res) {
	console.log("body: ", req.body);
	var graphs = [];
	var numGraphs = req.body.numGraphs;
	for (var i=1; i<=numGraphs; i++) {
		var gID = 'graph-id' + i;
		graphs.push({owner: req.user._id, graph: req.body[gID]});
	}
	console.log(graphs);
	var fusion = new Fusion({
		owners : [req.user._id],
		name : req.body.fusionName,
		graphs : graphs
	});

	fusion.save(function(err, fusion) {
		console.log("err:", err);
		console.log(fusion);
	});
	res.redirect('/dashboard');
});

/* DON'T NEED THIS */
router.post('/get/:id', function(req, res) {
	Graph.findOne({ _id: req.params.id}, function(err, graph) {
		if (err) {
			res.status(500).json({error: 'Could not find graph'});
		} else {
			res.json(graph);
		}
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
					};
					res.json({"graphName" : req.body.graphName});
				}
			});
		}
	});
});

router.post('/updateGraphColour', function(req, res) {
	Graph.findOne({ _id : req.body.id }, function(err, graph) {
		if (err) console.log(err);
		else {
			graph.colour = req.body.colour;
			graph.save(function(err, graph) {
				if (err) console.log("save error: " + err);
				else {
					console.log("Updated graph colour");
					var response = {
						status: 200,
						success: 'Updated successfully.',
					};
					res.json(response);
				}
			});
		}
	});
});

function createFindGraphFunction(id) {
	return function(callback) {
		Graph.findOne({ _id: id }, function(err, graph) {
			if (err) { callback(err); }
			else {
				console.log(id);
				callback(null, graph);
			}
		});
	};
}

router.get('/:id', function(req, res) {
	Graph.findOne({ _id: req.params.id }, function(err, graph) {
		if (err) {
			console.log(err);
		} else {
			if (graph == undefined) { // Fusion
				Fusion.findOne({_id: req.params.id}, function(err, fusion) {
					var findGraphFunctions = [];
					for (var i=0; i<fusion.graphs.length; i++) {
						var findFunc = createFindGraphFunction(fusion.graphs[i].graph);
						findGraphFunctions.push(findFunc);
					}
					async.series(findGraphFunctions, function(err, graphs){
						if (err) console.log(err);
						else {
							res.render('fusion', { fusion: JSON.stringify(fusion), fusionName: fusion.name, fusionId: req.params.id, graphs: JSON.stringify(graphs) });
						}
					});
				});
			} else { // Individual Graph
				res.render('graph', { graph: JSON.stringify(graph), graphName: graph.name, graphId: req.params.id });
			}
		}
	});
});

module.exports = router;