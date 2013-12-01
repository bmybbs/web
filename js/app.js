App = Ember.Application.create();

var appkey = 'newweb';

App.Router.map(function() {
	// put your routes here
	this.resource('board', { path: ':board_name' });
});

App.IndexRoute = Ember.Route.extend({

});

App.BoardRoute = Ember.Route.extend({
	model: function(params) {
		$.ajax({
			type: "GET",
			url: 'api/board/info?userid=' + localStorage.userid + '&sessid=' + localStorage.sessid + '&bname=' + params.board_name + '&appkey=' + appkey,
			dataType: 'json',
			success: function(data) {
				return data;
			}
		});
	}
});

Ember.Handlebars.helper('bmyBBM', function(items) {
	// 输出大版主
	var out="";
	for(var i=0; i<4; i++) {
		if(items[i] == null)
			break;
		out = out + " <a href='#'>" + items[i] + "</a>";
	}
	return out;
});

Ember.Handlebars.helper('bmySBM', function(items) {
	// 输出小版主
	var out="";
	for(var i=4; i<items.length; i++) {
		if(items[i] == null)
			break;
		out = out + " <a href='#'>" + items[i] + "</a>";
	}
	return out;
});

Ember.Handlebars.helper('bmyDate', function(tid) {
	var date = new Date(tid*1000);

	return date.toLocaleString();
})
