function formatUserRow(user) {
	var email = user.email;
	var name;
	if (user.name) {
		name = user.name;
	} else {
		name = email;
	}
	console.log(email);
	console.log(name);

	return "<tr class='userRow' id='" + user._id + "'><td>" + email + "</td><td>" + name + "</td></tr>";
}

function submitForm(id) {
	$('#' + id).submit();
}

function userLoggedIn(user) {
	if ($('.user-nav') != undefined) {
		if ( !$('.user-nav').hasClass('loggedIn') ) {
			$('.user-nav').addClass('loggedIn');
			var email = user.email;
			var name;
			if (user.name) {
				name = user.name;
			} else {
				name = email;
			}
			$('#userName').html(name);
			$('#userImage').attr('src', "../" + user.image);
		}
	}
}

function userLoggedOut() {
	if ($('.user-nav') != undefined) {
		console.log("removee");
		$('.user-nav').removeClass('loggedIn');
	}
}

/* NOT NEEDED
function getGraphs(user) {
	var graphs = [];
	if (!user.graphs.length == 0) {
		for (var i=0; i < user.graphs.length; i++) {
			graphs.push(user.graphs[i]);
		}
	}
	console.log(graphs);
	return graphs;
}
*/

function formatGraphButton(graph) {
	return '<div class="col-sm-2 dashboard-graph">'
			+ '<a href="/graph/' + graph._id + '">'
				+ '<button class="btn btn-default btn-graph">'
					+ '<p>' + graph.name + '</p>'
				+ '</button>'
			+ '</a>';
			+ '</div>';
}

function appendGraphButtons(container, graphs) {
	for (var i=0; i<graphs.length; i++) {
		$(container).append(formatGraphButton(graphs[i]));
	}
}

var OPTIONS = {
	'year' : 'year',
	'month' : 'month',
	'week' : 'week',
	'graph-year-option' : 'year',
	'graph-month-option' : 'month',
	'graph-week-option' : 'week'
};

function getDataset(set, date, option) {
	if (OPTIONS[option] == 'year') {
		return set.getYearSet(date, true);
	} else if (OPTIONS[option] == 'month') {
		return set.getMonthSet(date, true);
	} else if (OPTIONS[option] == 'week') {
		return set.getWeekSet(date, true);
	} else { // not one of the options
		return [];
	}
}

function formatDate(container, date, option) {
	if (OPTIONS[option] == 'year') {
		$(container).html(date.format('YYYY'));
		return date;
	} else if (OPTIONS[option] == 'month') {
		$(container).html(date.format('MMMM YYYY'));
		return date;
	} else if (OPTIONS[option] == 'week') {
		$(container).html(date.format('wo') + ' week of ' + date.format('YYYY'));
		return date;
	} else { // not one of the options
		return date;
	}
}

function forwardDate(container, date, option) {
	if (OPTIONS[option] == 'year') {
		date.add(1, 'y');
	} else if (OPTIONS[option] == 'month') {
		date.add(1, 'M');
	} else if (OPTIONS[option] == 'week') {
		date.add(1, 'w');
	} else { // not one of the options
		return -1;
	}

	return formatDate(container, date, option);
}

function backwardDate(container, date, option) {
	if (OPTIONS[option] == 'year') {
		date.subtract(1, 'y');
	} else if (OPTIONS[option] == 'month') {
		date.subtract(1, 'M');
	} else if (OPTIONS[option] == 'week') {
		date.subtract(1, 'w');
	} else { // not one of the options
		return -1;
	}

	return formatDate(container, date, option);
}

/* NOT NEEDED 
function convertDateToDayNumber(date) {
	console.log(moment(date, 'x').format('DDD'));
	return parseInt(moment(date, 'x').format('DDD'));
}
*/

var DAYOFWEEK = {
	1 : "Sun",
	2 : "Mon",
	3 : "Tues",
	4 : "Wed",
	5 : "Thur",
	6 : "Fri",
	7 : "Sat"
};

function weekAxis(d) {
	return DAYOFWEEK[d];
}

function Graph(container, dataset, option) {
	$(container).empty();

	var width = 600,
		height = 300,
		padding = 30,
		xPadding = 50,
		yPadding = 45;
		
	var xScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) { return d[0]; })])
				.range([xPadding, width - xPadding * 2]),
		yScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) { return d[1]; })])
				.range([height - yPadding, yPadding]),
		xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom'),
		yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left');

	if (OPTIONS[option] == 'week') {
		xAxis.tickFormat(weekAxis);
	}

	var svg = d3.select(container)
				.append('svg')
				.attr('width', width)
				.attr('height', height);

	svg.selectAll('circle')
		.data(dataset)
		.enter()
		.append('circle')
		.attr('cx', function(d) {
			return xScale(d[0]);
		})
		.attr('cy', function(d) {
			return yScale(d[1]);
		})
		.attr('r', 3);

	svg.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(0,' + (height - yPadding) + ')')
			.call(xAxis);

	svg.append('g')
		.attr('class', 'axis')
		.attr('transform', 'translate(' + xPadding + ', 0)')
		.call(yAxis);

	svg.append('text')
		.attr('x', (width - xPadding) / 2)
		.attr('y', height)
		.style('text-anchor', 'middle')
		.text('Time');

	svg.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('x', 0 - (height / 2))
		.attr('y', xPadding / 4)
		.style('text-anchor', 'middle')
		.text('Value');
		
	return 0;
}

