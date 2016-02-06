var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

function populateDropdownOwn(input) {
	console.log(input.value);
	var myGraphs = $('#myGraphs');
	myGraphs.empty();
	$.post("/graph/fuse/findOwn/" + input.value, function(data) {
		console.log("recevied from post:", data);
		for (var i=0; i<data.length; i++) {
			var option = document.createElement('option');
			option.value = data[i].name;
			option.setAttribute('id', data[i]._id);
			$('#myGraphs').append(option);
		}
	});
}

$('.btn-add-graph').on('click', function(e) {
	e.preventDefault();
	var num = $(this).parents('#fuseForm').find('.graph-input').length + 1;
	$('#numGraphs').val(num);

	// Creating input element
	var graph_input = document.createElement('input');
	graph_input.className += "form-control graph-input";
	graph_input.setAttribute('name', 'graph-id' + num);
	graph_input.setAttribute('placeholder', 'Graph ' + num);
	graph_input.setAttribute('list', 'myGraphs');
	graph_input.setAttribute('onkeyup', 'delay(populateDropdownOwn(this), 500)');

	var parent = $(this).parent();
	if (parent.attr('id') == 'own-graphs') {
		parent.children('.graph-input:last').after(graph_input);
	} else {
		parent.children('.graph-input:last').after(graph_input);
	}

});