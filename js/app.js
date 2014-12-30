App = Ember.Application.create();

// routers
App.BoardThreadRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);

		if(typeof(localStorage.boardtoptype) == "undefined")
			localStorage.boardtoptype = true;
		controller.set('boardtoptype', localStorage.boardtoptype);

		var b = new BMYAPIBoardRequest({ "name": model.board_name });
		b.pull().then(function(data) {
			controller.set('hasHotItems', (data.hot_topic.length>0));
			var pages = Math.ceil(data.thread_num / 20);
			data.paging = {"page": pages, "pages": pages};
			controller.set('board', data);
			controller.set('is_loaded_board', true);
		});

		var al = new BMYAPIArticleListRequest({ "type": "board", "board": model.board_name, "btype": "t" });
		al.pull().then(function(data) {
			controller.set('articles', data.articlelist);
			controller.set('is_loaded_articlelist', true);
		});

		var bt = new BMYAPIArticleListRequest({ "type": "boardtop", "board": model.board_name });
		bt.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('boardtop', data.articlelist);
				controller.set('is_loaded_boardtop', true);
			}
		});
	},
	renderTemplate: function() {
		this.render('board');
	}
});

// controllers
App.BoardThreadController = Ember.ObjectController.extend({
	actions: {
		normalMode: function() {
			var current_url = href.location;
			current_url.replace('/\/thread/', '');
		}
	}
});
