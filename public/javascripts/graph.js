/* Document ready */
$(document).ready(function() {
	// Change colour
	$('#changeColour').on('click', function() {
		console.log($('#spectrum').spectrum("get").toHexString());
		$.post('/graph/updateGraphColour',
			{ 
				id : $('#id').val(),
				colour : $('#spectrum').spectrum("get").toHexString()
			},
			function(response) {
				console.log("hello", response);
				$('<h2 id="savedMessage">Saved!</h2>').insertAfter('#changeColour');
				// $('#changeColour').after()
			}
		)
	});

	// Edit graph name
	$('#editGraphName').on('click', function() {
		$('#graphName').toggleClass('awake');
		$('#editGraphName').toggleClass('awake');
		$('#graphNameInput').toggleClass('awake').select();
		$('#graphNameBack').toggleClass('awake');
		$('#graphNameUpdate').toggleClass('awake');
	});

	$('#graphNameBack').on('click', function() {
		$('#graphNameInput').toggleClass('awake');
		$('#graphNameBack').toggleClass('awake');
		$('#graphNameUpdate').toggleClass('awake');
		$('#graphName').toggleClass('awake');
		$('#editGraphName').toggleClass('awake');
	});			

	// Update graph name
	$('#graphNameUpdate').on('click', function() {
		$.post('/graph/updateGraphName',
			{ graphName : $('#graphNameInput').val(),
			  id : $('#id').val() },
			function(response) {
				$('#graphNameInput').toggleClass('awake');
				$('#graphNameBack').toggleClass('awake');
				$('#graphNameUpdate').toggleClass('awake');
				$('#graphName').toggleClass('awake').html(response.graphName);
				$('#editGraphName').toggleClass('awake');
			}
		);
	});

	// Forward in time
	$('#forward').on('click', function() {
		var option = $('#graph-time-options > .btn.active').attr('id');
		console.log('before: ', date);
		forwardDate('#date', date, option);
		console.log('after: ', date);
		Graph('#graph-container', [getDataset(set, date, option)], option, [colour]);
	});

	// Backward in time
	$('#backward').on('click', function() {
		var option = $('#graph-time-options > .btn.active').attr('id');
		console.log('before: ', date);
		backwardDate('#date', date, option);
		console.log('after: ', date);
		Graph('#graph-container', [getDataset(set, date, option)], option, [colour]);
	});

	// Time options
	$('#graph-time-options > .btn').on('click', function() {
		var id = $(this).attr('id');
		formatDate('#date', date, id);
		var option = $(this).attr('id');
		Graph('#graph-container', [getDataset(set, date, option)], option, [colour]);
		$('#graph-time-options > .btn').removeClass('active');
		$(this).addClass('active');
	});
});
