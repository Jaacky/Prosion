function Dataset(data) {
	this.data = data;
}

function loop(condition) {
	dataset = [];

	for (var i=0; i<this.dataset.length; i++) {
		var dataDate = moment(data[i][0], 'x');
		// condition
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
		if (currentYear == d) {
			return true;
		} else {
			return false;
		}
	};

	return loop(currentYearCondition);
}

/*
* Return dataset of the current month
*/
Dataset.prototype.getCurrentMonth = function() {

}

/*
* Return dataset of the current week
*/
Dataset.prototype.getCurretWeek = function() {

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