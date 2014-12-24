App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend({
	searchcommand: ''
});

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

App.ArticleReadRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);

		var b = new BMYAPIBoardRequest({ "name": model.board_name });
		b.pull().then(function(data) {
			controller.set('board', data);
			controller.set('is_loaded_board', true);
		});

		var a = new BMYAPIArticleRequest({ "aid": model.aid, "board": model.board_name });
		a.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('article', data);
				console.log(data);
				controller.set('is_loaded_article', true);
			}
		});
	}
});

App.ArticlePostRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);

		var b = new BMYAPIBoardRequest({ "name": model.board_name });
		b.pull().then(function(data) {
			controller.set('board', data);
			controller.set('is_loaded_board', true);
		});

		var a = {
			'board': model.board_name,
			'title': '',
			'rid': '',
			'ref': '',
			'type': 'NewPost',
			'content': ''
		};

		controller.set('article', a);
		controller.set('is_loaded_article', true);
	}/*,
	renderTemplate: function() {
		this.render('articlePost');
	}*/
});

App.ArticleReplyRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);

		var b = new BMYAPIBoardRequest({ "name": model.board_name });
		b.pull().then(function(data) {
			controller.set('board', data);
			controller.set('is_loaded_board', true);
		});

		var ra = new BMYAPIArticleRequest({ "aid": model.aid, "board": model.board_name, "type": "RAW" });
		ra.pull().then(function(data) {
			if(data.errcode == 0) {
				var a = {
					'board': model.board_name,
					'title': (data.title.substr(0, 4) == 'Re: ') ? (data.title) : ('Re: '+data.title),
					'ref': model.aid,
					'rid': data.num,
					'content': '\n【 在 ' + data.author + ' 的大作中提到: 】\n: '+ data.content.replace(/\n/g, '\n: '),
					'thread': data.thread,
					'type': 'Reply'
				};
				controller.set('article', a);
				controller.set('is_loaded_article', true);
			}
		});
	}/*,
	renderTemplate: function() {
		this.render('articlePost');
	}*/
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

App.ArticlePostController = Ember.ObjectController.extend({
	actions: {
		doneEditing: function() {
			//console.log(this.get('article'));
			var ap = new BMYAPIArticlePostRequest(this.get('article'));
			var model = this.get('model');
			ap.post().then(function(data) {
				if(data.errcode == 0) {
					console.log(data.aid);
					var baseurl = location.href.split('#')[0];
					location.href = baseurl + '#/section/' + model.sec_id + '/' + model.board_name + '/' + data.aid.toString();
				}
				else
					console.log(data.errcode);
			});
		},
		test: function() {
			console.log('haha');
		}
	}
});

App.ArticleReplyController = Ember.ObjectController.extend({
	actions: {
		doneEditing: function() {
			//console.log(this.get('article'));
			var ap = new BMYAPIArticlePostRequest(this.get('article'));
			var model = this.get('model');
			ap.post().then(function(data) {
				if(data.errcode == 0) {
					console.log(data.aid);
					var baseurl = location.href.split('#')[0];
					location.href = baseurl + '#/section/' + model.sec_id + '/' + model.board_name + '/' + data.aid.toString();
				}
				else
					console.log(data.errcode);
			});
		}
	}
});
// helpers

// todo 直接读取 url # 后面的部分，需要改进
Ember.Handlebars.helper('BMYArticleReplyLink', function(value, option) {
	var link = "<a class='btn btn-default' href='#" + location.href.split('#')[1] + "/reply'>回复本文</a>";
	return new Ember.Handlebars.SafeString(link);
});

Ember.Handlebars.helper('BMYSecName', function(value, option) {
	return $.grep(bmysecstrs, function(e) {
		return e.id == value;
	})[0].name;
});

Ember.Handlebars.helper('BMYArticleContent', function(value, option) {
	return new Handlebars.SafeString(value);
});
