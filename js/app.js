App = Ember.Application.create();

App.Router.map(function() {
    this.route('index', { path: '/' })
});

App.IndexRoute = Ember.Route.extend({
	model : function() {
		return {};
	},
	setupController: function(controller, model) {
		//var get_user = function() {
		//	if(localStorage.userid == '')
		//};
		//controller.set('searchcommand', "");
	}
});
