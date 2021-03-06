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
		$(container).html(date.format('wo') + " week of " + date.format('YYYY') + "<br><span id='weekSubheader'>Week of " + date.format('MMM') + ' ' + date.startOf('isoWeek').format('Do') + "</span>");
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

var DAYOFWEEK = {
	1 : "Sun",
	2 : "Mon",
	3 : "Tues",
	4 : "Wed",
	5 : "Thur",
	6 : "Fri",
	7 : "Sat"
};

function plotPoints(svg, index, scales, dataset, colour) {
	console.log("inside plot points", dataset);
	svg.selectAll("circle" + index)
	.data(dataset)
	.enter()
	.append('circle')
	.attr('cx', function(d, i) {
		console.log(i);
		console.log(scales.x(d[0]));
		return scales.x(d[0]);
	})
	.attr('cy', function(d) {
		console.log(scales.y(d[1]))
		return scales.y(d[1]);
	})
	.attr('fill', colour)
	.attr('r', 4);
}

function weekAxis(d) {
	return DAYOFWEEK[d];
}

function Graph(container, datasets, option, colourSet) {
	var completeSet = [];
	for (var i=0; i<datasets.length; i++) {
		completeSet = completeSet.concat(datasets[i]);
	}

	console.log(datasets);
	console.log(completeSet);
	console.log(datasets[0]);

	$(container).empty();

	var width = 600,
		height = 300,
		padding = 30,
		xPadding = 50,
		yPadding = 45;
		
	var xScale = d3.scale.linear()
				.domain([0, d3.max(completeSet, function(d) { return d[0]; })])
				.range([xPadding, width - xPadding * 2]),
		yScale = d3.scale.linear()
				.domain([0, d3.max(completeSet, function(d) { return d[1]; })])
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

	for (var i=0; i<datasets.length; i++) {
		console.log("plot points called", datasets[i]);
		plotPoints(svg, i, { 'x' : xScale, 'y' : yScale }, datasets[i], colourSet[i]);
	}

	svg.append('g')
		.attr('class', 'axis')
		.attr('transform', 'translate(0,' + (height - yPadding) + ')')
		.call(xAxis);

	svg.append('g')
		.attr('class', 'axis')
		.attr('transform', 'translate(' + xPadding + ', 0)')
		.call(yAxis);

	svg.append('text')
		.attr('class', 'axis-text')
		.attr('x', (width - xPadding) / 2)
		.attr('y', height)
		.style('text-anchor', 'middle')
		.text('Time');

	svg.append('text')
		.attr('class', 'axis-text')
		.attr('transform', 'rotate(-90)')
		.attr('x', 0 - (height / 2))
		.attr('y', xPadding / 4)
		.style('text-anchor', 'middle')
		.text('Value');
		
	return 0;
}