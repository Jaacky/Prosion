// http://stackoverflow.com/questions/1909441/jquery-keyup-delay
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

// function hellogoodbye() {
// 	console.log("form!");
// 	return false;
// }

function populateDropdownOwn(input, datalist) {
	console.log(input.value);
	var dList = $(datalist);
	dList.empty();
	$.post("/graph/fuse/findOwn/" + input.value, function(data) {
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

function getDatalistOption(datalistID, value) {
	var option = $(datalistID).find("option[value='" + value + "']");
	console.log(option);
	var id = option.attr('id');
	console.log(id);
	return id;
}


//OPTION ID NOT FOUND
$('#fuseGraphs').on('click', function() {
	var graphInputs = {};
	$('#fuseForm .graph-input').each(function(i, element) {
		console.log(element.name);
		console.log(element.value);
		var graphId = element.name;
		var datalist = "#datalist-" + graphId.charAt(graphId.length - 1);
		console.log(datalist);
		graphInputs[element.name] = getDatalistOption(datalist, element.value);
		// graphInputs[element.name] = element.value;
	})
	console.log(graphInputs);
});