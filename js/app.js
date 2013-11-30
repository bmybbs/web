App = Ember.Application.create();

App.Router.map(function() {
	// put your routes here
	this.resource('board', { path: ':board_name' });
});

App.IndexRoute = Ember.Route.extend({

});
