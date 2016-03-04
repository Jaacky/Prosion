// function hellogoodbye() {
// 	console.log("form!");
// 	return false;
// }

function populateDropdownOwn(input, datalist) {
	console.log(input.value);
	var dList = $(datalist);
	dList.empty();
	$.post("/find/self/" + input.value, function(data) {
		console.log("recevied from post:", data);
		for (var i=0; i<data.length; i++) {
			var option = document.createElement('option');
			option.value = data[i].name;
			console.log(data[i]._id);
			option.setAttribute('id', data[i]._id);
			dList.append(option);
		}
	});
}

// $('#fuseForm').on('click', '.graph-input', function() {
// 	console.log(this.value);
// 	getDatalistOption('#myGraph', this.value);
// });

$('.btn-add-graph').on('click', function(e) {
	e.preventDefault();
	var num = $(this).parents('#fuseForm').find('.graph-input').length + 1;
	$('#numGraphs').val(num);

	// Creating input element
	var graph_input = document.createElement('input');
	graph_input.className += "form-control graph-input";
	graph_input.setAttribute('name', 'graph-id' + num);
	graph_input.setAttribute('placeholder', 'Graph ' + num);
	graph_input.setAttribute('list', 'datalist-' + num);
	graph_input.setAttribute('onkeyup', 'delay(populateDropdownOwn(this, "#datalist-' + num + '"), 500)');

	var datalist = document.createElement('datalist');
	datalist.id = 'datalist-' + num;

	var parent = $(this).parent();
	if (parent.attr('id') == 'own-graphs') {
		parent.children('.graph-input:last').after(graph_input);
		parent.children('.graph-input:last').after(datalist);
	} else {
		parent.children('.graph-input:last').after(graph_input);
		parent.children('.graph-input:last').after(datalist);
	}

});

$('#fuseGraphs').on('click', function() {
	var formData = {};
	$('#fuseForm .graph-input').each(function(i, element) {
		var graphInputId = element.name;
		var datalist = "#datalist-" + graphInputId.charAt(graphInputId.length - 1);
		var graphId = getDatalistOption(datalist, element.value);
		if (graphId == undefined) { //  Leave out the empty or invalid/non existing 
			return true; // break out
		} else {
			console.log('not undefeind mofoo');
			formData[element.name] = getDatalistOption(datalist, element.value);
		}
	});
	formData['fusionName'] = $('#fusionName').val();
	formData['numGraphs'] = $('#numGraphs').val();
	// console.log(formData);
	post('/graph/fuse', formData);
});