App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend({
	searchcommand: ''
});

// routers
App.FavRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);

		controller.set('secname', "收藏夹");

		var bl = new BMYAPIBoardListRequest({ "secstr": "fav" });
		bl.pull().then(function(data) {
			controller.set('boardlist', data.boardlist);
			controller.set('is_loaded_boardlist', true);
		});
	},
	renderTemplate: function() {
		this.render('boardlist');
	}
});

App.BoardRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);

		if(typeof(localStorage.boardtoptype) == "undefined")
			localStorage.boardtoptype = true;	// 置顶模式
		controller.set('boardtoptype', localStorage.boardtoptype);

		localStorage.thread_mode = false;		// 用于在其他 templates 中传递值
		controller.set('thread_mode', false);

		var b = new BMYAPIBoardRequest({ "name": model.board_name });
		b.pull().then(function(data) {
			controller.set('hasHotItems', (data.hot_topic.length>0));

			var pages = Math.ceil(data.article_num / 20);
			var page  = pages;
			data.paging = {"page": page, "pages": pages};
			controller.set('board', data);
			controller.set('is_loaded_board', true);
		});


		var al = new BMYAPIArticleListRequest({ "type": "board", "board":model.board_name, "btype":"0"});
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
	}
});

App.BoardPageRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);

		if(typeof(localStorage.boardtoptype) == "undefined")
			localStorage.boardtoptype = true;	// 置顶模式


		localStorage.thread_mode = false;		// 用于在其他 templates 中传递值
		controller.set('thread_mode', false);

		var b = new BMYAPIBoardRequest({ "name": model.board_name });
		b.pull().then(function(data) {
			controller.set('hasHotItems', (data.hot_topic.length>0));

			var pages = Math.ceil(data.article_num / 20);
			var page  = model.page_num;
			data.paging = {"page": page, "pages": pages};
			controller.set('board', data);
			controller.set('is_loaded_board', true);
		});


		var al = new BMYAPIArticleListRequest({ "type": "board", "board":model.board_name, "btype":"0", "page":model.page_num});
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
App.BoardController = Ember.ObjectController.extend({
	actions: {
		threadMode: function() {
			href.location += "/thread";
		}
	}
});

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

Ember.Handlebars.helper('BMYBoardZhLink', function(value, option) {
	var link = "<a href='#/section/" + value.secstr + "/" + value.name + "'>" + value.zh_name + "</a>";
	return new Handlebars.SafeString(link);
});

Ember.Handlebars.helper('BMYBoardLinkFake', function(value, option) {
	// 创建一个伪版面链接，secstr 不正确，但是版面依旧可以显示。仅使用于导读页。
	var link = "<a href='#/section/0/" + value + "' class='dashboard-item-board'>" + value + "</a>";
	return new Handlebars.SafeString(link);
});

Ember.Handlebars.helper('BMYArticleLinkFake', function(value, option) {
	var link = "<a href='#/section/0/" + value.board + "/" + value.aid + "'>" + value.title + "</a>";
	return new Handlebars.SafeString(link);
});

Ember.Handlebars.helper('BMYSecName', function(value, option) {
	return $.grep(bmysecstrs, function(e) {
		return e.id == value;
	})[0].name;
});

Ember.Handlebars.helper('BMYBoardPageLink', function(value, option) {
	var out = "";

	// link_base example "<a href='#/section/0/sysop"
	var link_base  = "<a href='#/section/" + value.secstr + "/" + value.name;
	var page_first = link_base + "/page/1'>首页</a>";
	var page_prev  = link_base + "/page/" + (parseInt(value.paging.page) - 1) + "'>上一页</a>";
	var page_next  = link_base + "/page/" + (parseInt(value.paging.page) + 1) + "'>下一页</a>";
	var page_last  = link_base + "'>末页</a>";

	if(value.paging.pages == 1)					// 只有一页
		out = "";
	if(value.paging.page == value.paging.pages) { // 已经是末页
		out = page_first + " / " + page_prev;
		console.log("1");
		console.log(out);
	} else if(value.paging.page == 1) {				// 已经是首页
		out = page_next + " / " + page_last;
		console.log("2");
		console.log(out);
	} else {
		out = page_first + " / " + page_prev + " / " + page_next + " / " + page_last;
		console.log("3");
		console.log(out);
	}

	return new Handlebars.SafeString(out);
});

Ember.Handlebars.helper('BMYBoardNewLink', function(value, option) {
	var link = "<a href='#/section/" + value.secstr.toString() + "/" + value.name + "/new'>发表文章</a>";
	console.log(link);
	return new Handlebars.SafeString(link);
});

Ember.Handlebars.helper('BMYArticleContent', function(value, option) {
	return new Handlebars.SafeString(value);
});

Ember.Handlebars.helper('BMYSectionLink', function(value, option) {
	var sec_name = $.grep(bmysecstrs, function(e) {
		return e.id == value.secstr;
	})[0].name;

	var link = "<a href='#/section/" + value.secstr.toString() + "'>" + sec_name + "</a>";
	return new Handlebars.SafeString(link);
});
