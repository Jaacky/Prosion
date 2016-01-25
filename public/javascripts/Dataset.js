function Dataset(data) {
	this.data = data;
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
* Return dataset of the current year
*/
Dataset.prototype.getCurrentYear = function(conversion) {
	var currentYear = moment().year();
	var currentYearCondition = function(d) {
		return currentYear == d.year();
	};
	var convertDate = function(d) {
		newX = parseInt(moment(d[0], 'x').format('DDD'));
		return [newX, d[1]];
	}
	if (conversion) {
		return loop(currentYearCondition, this.data, convertDate);
	} else {
		return loop(currentYearCondition, this.data, false);
	}
}

/*
* Return dataset of the current month
*/
Dataset.prototype.getCurrentMonth = function(conversion) {
	var currentMonth = moment().month();
	var currentMonthCondition = function(d) {
		return currentMonth == d.month();
	};
	var convertDate = function(d) {
		newX = parseInt(moment(d[0], 'x').format('D'));
		return [newX, d[1]];
	}
	if (conversion) {
		return loop(currentMonthCondition, this.getCurrentYear(false), convertDate);
	} else {
		return loop(currentMonthCondition, this.getCurrentYear(false), false);
	}
}

/*
* Return dataset of the current week
*/
Dataset.prototype.getCurrentWeek = function(conversion) {
	var currentWeek = moment().week();
	var currentWeekCondition = function(d) {
		return currentWeek == d.week();
	}
	var convertDate = function(d) {
		newX = parseInt(moment(d[0], 'x').format('d')) + 1; // Need to add 1 because week starts at 0
		return [newX, d[1]];
	}
	if (conversion) {
		return loop(currentWeekCondition, this.getCurrentMonth(false), convertDate);
	} else {
		return loop(currentWeekCondition, this.getCurrentMonth(false), false);
	}
}

/*
* Return the dataset from num years from current date
*/
Dataset.prototype.backPreviousYears = function(num) {

}

/*
* Return the dataset from num months from current date
*/
Dataset.prototype.backPreviousMonths = function(num) {

}

/*
* Return the dataset from num weeks from current date
*/
Dataset.prototype.backPreviousWeeks = function(num) {

}