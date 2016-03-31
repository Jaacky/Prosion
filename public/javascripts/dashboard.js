DASHBOARD_NAV = {
	"dbNew" : displayNew,
	"dbFuse" : displayFuse,
	"dbPersonalGraphs" : displayPersonalGraphs,
	"dbFusedGraphs" : displayFusedGraphs
}

$('.dashboard-nav').on('click', function() {
	$('.dashboard-nav').removeClass('active');
	$(this).addClass('active');

	// $('#dashboard').empty();
	var id = $(this).attr('id');
	DASHBOARD_NAV[id]();
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
// function displayNew() {

// 	var dashboard = document.getElementById('dashboard');

// 	var col1 = document.createElement('div');
// 	col1.className += "col-sm-6";
// 	dashboard.appendChild(col1);

// 	var form = document.createElement('form');
// 	form.id = "createGraphForm";
// 	form.action = '/createGraph';
// 	form.method ='post';
// 	col1.appendChild(form);

// 	var input_group = document.createElement('div');
// 	input_group.className += "input-group";
// 	form.appendChild(input_group);

// 	var input = document.createElement('input');
// 	input.type = "text";
// 	input.id = "graphName";
// 	input.className += "form-control";
// 	input.name = "graphName";
// 	input.placeholder = "Graph Name";
// 	input_group.appendChild(input);

// 	var span = document.createElement('span');
// 	span.className += "input-group-btn";
// 	input_group.appendChild(span);

// 	var span_button = document.createElement('button');
// 	span_button.className += "btn btn-default";
// 	span_button.id = "createGraph";
// 	span_button.type = "submit";
// 	span_button.appendChild(document.createTextNode("Create new graph"));
// 	span.appendChild(span_button);
// }

/*
*** OLD FUSE
* The structure that displayFuse creates
* .col-sm-6
* 	 a(href='/graph/fuse')
* 		 button.btn.btn-default Fuse
*

function displayFuse() {
	var col1 = document.createElement('div');
	col1.className += "col-sm-6";

	var link = document.createElement('a');
	link.href = "/graph/fuse";

	var button = document.createElement('button');
	button.className += "btn btn-default";
	button.appendChild(document.createTextNode("Fuse"));

	col1.appendChild(link);
	link.appendChild(button);

	var dashboard = document.getElementById('dashboard');
	dashboard.appendChild(col1);
}
*/

/*
	.row
		.col-sm-12
			h1 Fusion baby

	.row
		#fuseForm
			.col-sm-12
				input.form-control(name='fusionName', id = 'fusionName' placeholder='Fusion Name')
				input(name='numGraphs' id='numGraphs' value='2' hidden)
			.col-sm-6#own-graphs
				h2 Your graphs
				input.form-control.graph-input(name='graph-id1' placeholder='Graph 1' list='datalist-1' onkeyup='delay(populateDropdownOwn(this, "#datalist-1"), 500)')
				datalist#datalist-1
				button.btn.btn-default.btn-add-graph + Add another graph
			.col-sm-6#other-graphs
				h2 Your friends' graphs
				input.form-control.graph-input(name='graph-id2' placeholder='Graph 2' list='datalist-2' onkeyup='delay(populateDropdownOwn(this, "#datalist-2"), 500)')
				datalist#datalist-2
				button.btn.btn-default.btn-add-graph + Add another graph
			.col-sm-12
				button.btn.btn-default#fuseGraphs(type='submit') Fuse plz
	script(src='../javascripts/fuse.js')
*/
// function displayFuse() {
// 	var dashboard = document.getElementById('dashboard');

// 	var row = document.createElement('div');
// 	row.className += "row";
// 	dashboard.appendChild(row);

// 	var fuseForm = document.createElement('div');
// 	fuseForm.id = "fuseForm";
// 	row.appendChild(fuseForm);

// 	var c1 = document.createElement('div');
// 	c1.className += "col-sm-12";
// 	fuseForm.appendChild(c1)

// 	var fusionName = document.createElement('input');
// 	fusionName.className += "form-control";
// 	fusionName.name = "fusionName";
// 	fusionName.id = "fusionName";
// 	fusionName.placeholder = "Fusion Name";
// 	c1.appendChild(fusionName);

// 	var numGraphs = document.createElement('input');
// 	numGraphs.name = "numGraphs";
// 	numGraphs.id = "numGraphs";
// 	numGraphs.value = "2";
// 	numGraphs.type = "hidden";
// 	c1.appendChild(numGraphs);

// 	var c2 = document.createElement('div');
// 	c2.className += "col-sm-6";
// 	c2.id = "own-graphs";
// 	fuseForm.appendChild(c2);

// 	var c2h2 = document.createElement('h2');
// 	c2h2.innerHTML = "Your graphs";
// 	c2.appendChild(c2h2);

// 	var c2input = document.createElement('input');
// 	c2input.className += "form-control graph input";
// 	c2input.name = "graph-id1";
// 	c2input.placeholder = "Graph 1";
// 	c2input.setAttribute("list", "datalist-1");
// 	c2input.setAttribute("onkeyup", "delay(populateDropdownOwn(this, '#datalist-1'), 500)");
// 	c2.appendChild(c2input);

// 	var d1 = document.createElement('datalist');
// 	d1.id = "datalist-1";
// 	c2.appendChild(d1);

// 	var c2button = document.createElement('button');
// 	c2button.className += "btn btn-default btn-add-graph";
// 	c2button.innerHTML = "+ Add another graph";
// 	c2.appendChild(c2button);

// 	var c3 = document.createElement('div');
// 	c3.className += "col-sm-6";
// 	c3.id = "other-graphs";
// 	fuseForm.appendChild(c3);

// 	var c3h2 = document.createElement('h2');
// 	c3h2.innerHTML = "Your friends' graphs";
// 	c3.appendChild(c3h2);

// 	c3input = document.createElement('input');
// 	c3input.className += "form-control graph input";
// 	c3input.name = "graph-id2";
// 	c3input.placeholder = "Graph 2";
// 	c3input.setAttribute("list", "datalist-2");
// 	c3input.setAttribute("onkeyup", "delay(populateDropdownOwn(this, '#datalist-2'), 500)");
// 	c3.appendChild(c3input);

// 	var d2 = document.createElement('datalist');
// 	d2.id = "datalist-2";
// 	c3.appendChild(d2);

// 	var c3button = document.createElement('button');
// 	c3button.className += "btn btn-default btn-add-graph";
// 	c3button.innerHTML = "+ Add another graph";
// 	c3.appendChild(c3button);

// 	var c4 = document.createElement('div');
// 	c4.className += "col-sm-12";
// 	fuseForm.appendChild(c4);

// 	c4button = document.createElement('button');
// 	c4button.className += "btn btn-default";
// 	c4button.id = "fuseGraphs";
// 	c4button.innerHTML = "Fuse em!";
// 	c4.appendChild(c4button);
// }

function displayNew () {
	$('.dashboardContainer').removeClass("active");
	$('#dbNewContainer').addClass("active");
}

function displayFuse() {
	$('.dashboardContainer').removeClass("active");
	$('#fuseForm').addClass("active");
}

function displayPersonalGraphs() {
	$('.dashboardContainer').removeClass("active");
	$('#dbPersonalGraphsContainer').addClass("active");
}

function displayFusedGraphs() {
	$('.dashboardContainer').removeClass("active");
	$('#dbFusedGraphsContainer').addClass("active");
}