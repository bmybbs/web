App = Ember.Application.create();

App.Router.map(function() {
	this.route('index', { path: '/' });
	this.route('board', { path: '/section/:sec_id/:board_name' });
});

App.ApplicationController = Ember.Controller.extend({
	searchcommand: ''
});

// routers
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

		bmy_api_top10_req.pull().then(function(data) {
			var d = data.articlelist;
			for(var i=0; i<3; i++) {
				d[i].hot = true;
			}
			controller.set('articlelist_top10', d);
			controller.set('is_loaded_articlelist_top10', true);
		});

		bmy_api_announce_req.pull().then(function(data) {
			controller.set('articlelist_announce', data.articlelist);
			controller.set('is_loaded_articlelist_announce', true);
		});

		bmy_api_commend_req.pull().then(function(data) {
			controller.set('articlelist_commend', data.articlelist);
			controller.set('is_loaded_articlelist_commend', true);
		});

		bmy_api_sectop_0_req.pull().then(function(data) {
			controller.set('articlelist_sectop_0', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_0', true);
		});

		bmy_api_sectop_1_req.pull().then(function(data) {
			controller.set('articlelist_sectop_1', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_1', true);
		});

		bmy_api_sectop_2_req.pull().then(function(data) {
			controller.set('articlelist_sectop_2', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_2', true);
		});

		bmy_api_sectop_3_req.pull().then(function(data) {
			controller.set('articlelist_sectop_3', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_3', true);
		});

		bmy_api_sectop_4_req.pull().then(function(data) {
			controller.set('articlelist_sectop_4', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_4', true);
		});

		bmy_api_sectop_5_req.pull().then(function(data) {
			controller.set('articlelist_sectop_5', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_5', true);
		});

		bmy_api_sectop_6_req.pull().then(function(data) {
			controller.set('articlelist_sectop_6', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_6', true);
		});

		bmy_api_sectop_7_req.pull().then(function(data) {
			controller.set('articlelist_sectop_7', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_7', true);
		});

		bmy_api_sectop_8_req.pull().then(function(data) {
			controller.set('articlelist_sectop_8', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_8', true);
		});

		bmy_api_sectop_9_req.pull().then(function(data) {
			controller.set('articlelist_sectop_9', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_9', true);
		});

		bmy_api_sectop_G_req.pull().then(function(data) {
			controller.set('articlelist_sectop_G', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_G', true);
		});

		bmy_api_sectop_N_req.pull().then(function(data) {
			controller.set('articlelist_sectop_N', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_N', true);
		});

		bmy_api_sectop_H_req.pull().then(function(data) {
			controller.set('articlelist_sectop_H', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_H', true);
		});

		bmy_api_sectop_A_req.pull().then(function(data) {
			controller.set('articlelist_sectop_A', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_A', true);
		});

		bmy_api_sectop_C_req.pull().then(function(data) {
			controller.set('articlelist_sectop_C', data.articlelist);
			controller.set('is_loaded_articlelist_sectop_C', true);
		});
	}
});

App.BoardRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);
		var b = new BMYAPIBoardRequest({ "name": model.board_name });
		b.pull().then(function(data) {
			controller.set('board', data);
			controller.set('is_loaded_board', true);
			controller.set('hasHotItems', (data.hot_topic.length>0));
		});

		var a = new BMYAPIArticleListRequest({ "type": "board", "board":model.board_name, "btype":"0"});
		a.pull().then(function(data) {
			controller.set('articles', data.articlelist);
			controller.set('is_loaded_articlelist', true);
		});
	}
});

// helpers
Ember.Handlebars.helper('BMYTime', function(value, option) {
	var t = new moment.unix(value);
	return t.format('YYYY.MM.DD HH:mm');
});

Ember.Handlebars.helper('BMYArticleLink', function(value, option) {

});

Ember.Handlebars.helper('BMYBoardLink', function(value, option) {

});

Ember.Handlebars.helper('BMYSecName', function(value, option) {
	return $.grep(bmysecstrs, function(e) {
		return e.id == value;
	})[0].name;
});

Ember.Handlebars.helper('BMYBigBM', function(value, option) {
	var out = "";
	for(var i=0; i<4; i++) {
		if(value[i] == null)
			break;
		out += "&nbsp;<a href='#'>" + value[i] + "</a>";
	}

	return new Handlebars.SafeString(out);
});

Ember.Handlebars.helper('BMYSmallBM', function(value, option) {
	var out = "";
	for(var i=4; i<value.length; i++) {
		if(value[i] == null)
			break;
		out += "&nbsp;<a href='#'>" + value[i] + "</a>";
	}

	return new Handlebars.SafeString(out);
});
