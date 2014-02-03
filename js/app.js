App = Ember.Application.create();

App.Router.map(function() {
	this.route('index', { path: '/' })
});

App.ApplicationController = Ember.Controller.extend({
	searchcommand: ''
});

App.IndexRoute = Ember.Route.extend({
	model : function() {
		return [];
	},
	setupController: function(controller, model) {
		var bmy_api_top10_req = new BMYAPIArticleListRequest({ type: "top10" });
		var bmy_api_announce_req = new BMYAPIArticleListRequest({ type: "announce" });
		var bmy_api_commend_req = new BMYAPIArticleListRequest({ type: "commend" });
		var bmy_api_sectop_0_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 0 });
		var bmy_api_sectop_1_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 1 });
		var bmy_api_sectop_2_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 2 });
		var bmy_api_sectop_3_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 3 });
		var bmy_api_sectop_4_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 4 });
		var bmy_api_sectop_5_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 5 });
		var bmy_api_sectop_6_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 6 });
		var bmy_api_sectop_7_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 7 });
		var bmy_api_sectop_8_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 8 });
		var bmy_api_sectop_9_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 9 });
		var bmy_api_sectop_G_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 'G' });
		var bmy_api_sectop_N_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 'N' });
		var bmy_api_sectop_H_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 'H' });
		var bmy_api_sectop_A_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 'A' });
		var bmy_api_sectop_C_req = new BMYAPIArticleListRequest({ type: "sectop", secstr: 'C' });

		controller.set('articlelist_top10', bmy_api_top10_req.pull().articlelist);
		controller.set('articlelist_announce', bmy_api_announce_req.pull().articlelist);
		controller.set('articlelist_commend', bmy_api_commend_req.pull().articlelist);
		controller.set('articlelist_sectop_0', bmy_api_sectop_0_req.pull().articlelist);
		controller.set('articlelist_sectop_1', bmy_api_sectop_1_req.pull().articlelist);
		controller.set('articlelist_sectop_2', bmy_api_sectop_2_req.pull().articlelist);
		controller.set('articlelist_sectop_3', bmy_api_sectop_3_req.pull().articlelist);
		controller.set('articlelist_sectop_4', bmy_api_sectop_4_req.pull().articlelist);
		controller.set('articlelist_sectop_5', bmy_api_sectop_5_req.pull().articlelist);
		controller.set('articlelist_sectop_6', bmy_api_sectop_6_req.pull().articlelist);
		controller.set('articlelist_sectop_7', bmy_api_sectop_7_req.pull().articlelist);
		controller.set('articlelist_sectop_8', bmy_api_sectop_8_req.pull().articlelist);
		controller.set('articlelist_sectop_9', bmy_api_sectop_9_req.pull().articlelist);
		controller.set('articlelist_sectop_G', bmy_api_sectop_G_req.pull().articlelist);
		controller.set('articlelist_sectop_N', bmy_api_sectop_N_req.pull().articlelist);
		controller.set('articlelist_sectop_H', bmy_api_sectop_H_req.pull().articlelist);
		controller.set('articlelist_sectop_A', bmy_api_sectop_A_req.pull().articlelist);
		controller.set('articlelist_sectop_C', bmy_api_sectop_C_req.pull().articlelist);

		controller.set('is_loaded_articlelist_top10', true);
	}
});

// helpers
Ember.Handlebars.helper('BMYTime', function(value, option) {
	var t = new moment.unix(value);
	return t.format('YYYY.MM.DD HH:mm:ss');
});

Ember.Handlebars.helper('BMYArticleLink', function(value, option) {

});

Ember.Handlebars.helper('BMYBoardLink', function(value, option) {

});