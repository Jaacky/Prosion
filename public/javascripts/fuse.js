function populateDropdownOwn(input) {
	console.log(input.value);
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
	graph_input.setAttribute('onkeyup', 'populateDropdownOwn(this)');

	var parent = $(this).parent();
	if (parent.attr('id') == 'own-graphs') {
		parent.children('.graph-input:last').after(graph_input);
	} else {
		parent.children('.graph-input:last').after(graph_input);
	}

});