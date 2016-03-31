function populateSearchFriendsOptions(input, selection, url) {
	var select = $(selection);
	select.empty();
	console.log(url + input);
	$.post(url + input , function(data) {
		console.log(data);
		for (var i=0; i<data.length; i++) {
			var option = document.createElement('option');
			option.innerHTML = data[i].name;
			// option.value = data[i].name;
			option.value = data[i]._id;
			option.setAttribute('id', data[i]._id);
			select.append(option);
		}
		// select.chosen();
		// $('#searchFriendsContainer .chosen-search input').on('keyup', function() {
		// 	console.log($("#searchFriendsName").chosen().val());
		// });
		select.on('change', function(e, params) {
			console.log(e);
			console.log(params);
		});
		// select.trigger('chosen:updated');
		// select.trigger('chosen:open');
	});
}
