DASHBOARD_NAV = {
	"dbNew" : displayNew,
	"dbFuse" : displayFuse,
	"dbPersonalGraphs" : displayPersonalGraphs,
	"dbFusedGraphs" : displayFusedGraphs
}

$('.dashboard-nav').on('click', function() {
	console.log($(this).attr('id'));
	displayNew();
});

/*
* The structure that displayNew creates
* .col-sm-6
* 	form#createGraphForm(action='/createGraph', method='post')
* 		.input-group
* 			input.form-control(type='text', id='graphName', name='graphName', placeholder='Graph Name')
* 			span.input-group-btn
* 				button.btn.btn-default#createGraph(type='submit') Create new graph
*/
function displayNew() {
	var col1 = document.createElement('div');
	col1.className += "col-sm-6";

	var form = document.createElement('form');
	form.id = "createGraphForm";
	form.action = '/createGraph';
	form.method ='post';

	var input_group = document.createElement('div');
	input_group.className += "input-group";

	var input = document.createElement('input');
	input.type = "text";
	input.id = "graphName";
	input.className += "form-control";
	input.name = "graphName";
	input.placeholder = "Graph Name";

	var span = document.createElement('span');
	span.className += "input-group-btn";

	var span_button = document.createElement('button');
	span_button.className += "btn btn-default";
	span_button.id = "createGraph";
	span_button.type = "submit";
	span_button.appendChild(document.createTextNode("Create new graph"));

	col1.appendChild(form);
	form.appendChild(input_group);
	input_group.appendChild(input);
	input_group.appendChild(span);
	span.appendChild(span_button);

	var dashboard = document.getElementById('dashboard');
	dashboard.appendChild(col1);
}



function displayFuse() {

}

function displayPersonalGraphs() {

}

function displayFusedGraphs() {

}