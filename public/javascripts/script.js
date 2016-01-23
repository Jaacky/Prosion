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