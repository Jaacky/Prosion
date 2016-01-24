function Dataset(data) {
	this.data = data;
}

function loop(condition, data) {
	dataset = [];
	for (var i=0; i<data.length; i++) {
		var dataDate = moment(data[i][0], 'x');
		if (condition(dataDate)) {
			dataset.push(data[i]);
		}
	}
	return dataset;
}

/*
* Return dataset of the current year
*/
Dataset.prototype.getCurrentYear = function() {
	var currentYear = moment().year();
	var currentYearCondition = function(d) {
		return currentYear == d.year();
	};

	return loop(currentYearCondition, this.data);
}

/*
* Return dataset of the current month
*/
Dataset.prototype.getCurrentMonth = function() {
	var currentMonth = moment().month();
	var currentMonthCondition = function(d) {
		return currentMonth == d.month();
	};

	return loop(currentMonthCondition, this.getCurrentYear());
}

/*
* Return dataset of the current week
*/
Dataset.prototype.getCurrentWeek = function() {
	var currentWeek = moment().week();
	var currentWeekCondition = function(d) {
		return currentWeek == d.week();
	}

	return loop(currentWeekCondition, this.getCurrentMonth());
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