// http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit?rq=1
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

// http://stackoverflow.com/questions/1909441/jquery-keyup-delay
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();



function submitForm(id) {
	$('#' + id).submit();
}

function userLoggedIn(user) {
	if ($('.user-nav') != undefined) {
		if ( !$('.user-nav').hasClass('loggedIn') ) {
			$('.user-nav').addClass('loggedIn');
			var email = user.email;
			var name;
			if (user.name) {
				name = user.name;
			} else {
				name = email;
			}
			$('#userName').html(name);
			$('#userImage').attr('src', "../" + user.image);
		}
	}
}

function userLoggedOut() {
	if ($('.user-nav') != undefined) {
		console.log("removee");
		$('.user-nav').removeClass('loggedIn');
	}
}

function getDatalistOption(datalistID, value) {
	var option = $(datalistID).find("option[value='" + value + "']");
	var id = option.attr('id');
	return id;
}

function populateDropdown(input, datalist, url) {
	var dList = $(datalist);
	dList.empty();

	$.post(url + input.value, function(data) {
		console.log("received from post", data);
		for (var i=0; i<data.length; i++) {
			var option = document.createElement('option');
			option.value = data[i].name;
			option.setAttribute('id', data[i]._id);
			dList.append(option);
		}
	});
}

/*
UNUSED
*/
function formatUserRow(user) {
	var email = user.email;
	var name;
	if (user.name) {
		name = user.name;
	} else {
		name = email;
	}
	console.log(email);
	console.log(name);

	return "<tr class='userRow' id='" + user._id + "'><td>" + email + "</td><td>" + name + "</td></tr>";
}

/*
UNUSED
*/
function populateDropdownSearch(input, datalist) {
	var dList = $(datalist);
	dList.empty();

	$.post("/find/people/" + input.value, function(data) {
		console.log("received from post", data);
		for (var i=0; i<data.length; i++) {
			var option = document.createElement('option');
			option.value = data[i].name;
			option.setAttribute('id', data[i]._id);
			dList.append(option);
		}
	});
}

/*
UNUSED NOW
*/
function formatGraphButton(graph) {
	return '<div class="col-sm-2 dashboard-graph">'
			+ '<a href="/graph/' + graph._id + '">'
				+ '<button class="btn btn-default btn-graph">'
					+ '<p>' + graph.name + '</p>'
				+ '</button>'
			+ '</a>';
			+ '</div>';
}

/*
UNUSED NOW
*/
function appendGraphButtons(container, graphs) {
	for (var i=0; i<graphs.length; i++) {
		$(container).append(formatGraphButton(graphs[i]));
	}
}



