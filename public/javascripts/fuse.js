
$('.btn-add-graph').on('click', function(e) {
	e.preventDefault();
	var num = $(this).parents('#fuseForm').find('.graph-input').length;
	var graph_input = '<input class="form-control graph-input" name="graph-id' + num + '" placeholder="Graph ' + num + '">'
	var parent = $(this).parent();
	if (parent.attr('id') == 'own-graphs') {
		parent.children('.graph-input:last').after(graph_input);
	} else {
		parent.children('.graph-input:last').after(graph_input);
	}

});