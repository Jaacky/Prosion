function Dataset(data, colour) {
	this.data = data;
	this.colour = colour;
}

function loop(condition, data, conversion) {
	dataset = [];
	for (var i=0; i<data.length; i++) {
		var dataDate = moment(data[i][0], 'x');
		if (condition(dataDate)) {
			if (!conversion) {
				dataset.push(data[i]);
			} else {
				dataset.push(conversion(data[i]));
			}	
		}
	}
	return dataset;
}

/*
* Return dataset of the year
*/
Dataset.prototype.getYearSet = function(date, conversion) {
	var year = date.year();
	var yearCondition = function(d) {
		return year == d.year();
	};
	var convertDate = function(d) {
		newX = parseInt(moment(d[0], 'x').format('DDD'));
		return [newX, d[1]];
	}
	if (conversion) {
		return loop(yearCondition, this.data, convertDate);
	} else {
		return loop(yearCondition, this.data, false);
	}
}

/*
* Return dataset of the month
*/
Dataset.prototype.getMonthSet = function(date, conversion) {
	var month = date.month();
	var monthCondition = function(d) {
		return month == d.month();
	};
	var convertDate = function(d) {
		newX = parseInt(moment(d[0], 'x').format('D'));
		return [newX, d[1]];
	}
	if (conversion) {
		return loop(monthCondition, this.getYearSet(date, false), convertDate);
	} else {
		return loop(monthCondition, this.getYearSet(date, false), false);
	}
}

/*
* Return dataset of the week
*/
Dataset.prototype.getWeekSet = function(date, conversion) {
	var week = date.week();
	var weekCondition = function(d) {
		return week == d.week();
	}
	var convertDate = function(d) {
		newX = parseInt(moment(d[0], 'x').format('d')) + 1; // Need to add 1 because week starts at 0
		return [newX, d[1]];
	}
	if (conversion) {
		return loop(weekCondition, this.getMonthSet(date, false), convertDate);
	} else {
		return loop(weekCondition, this.getMonthSet(date, false), false);
	}
}

/*
* Return the dataset from num years from date
*/
Dataset.prototype.backPreviousYears = function(num) {

}

/*
* Return the dataset from num months from date
*/
Dataset.prototype.backPreviousMonths = function(num) {

}

/*
* Return the dataset from num weeks from date
*/
Dataset.prototype.backPreviousWeeks = function(num) {

}