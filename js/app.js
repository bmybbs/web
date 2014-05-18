App = Ember.Application.create();

App.Router.map(function() {
	this.resource('index', { path: '/' });
	this.resource('section', { path: '/section/:sec_id' });
	this.resource('fav', { path: '/fav' });

	this.resource('board', { path: '/section/:sec_id/:board_name' });
	this.resource('boardPage', { path: '/section/:sec_id/:board_name/page/:page_num'});

	this.resource('articleRead', { path: '/section/:sec_id/:board_name/:aid' });
	this.resource('articlePost', { path: '/section/:sec_id/:board_name/new' });
	this.resource('articleReply', { path: '/section/:sec_id/:board_name/:aid/reply' });
});

App.ApplicationController = Ember.Controller.extend({
	searchcommand: ''
});

// routers
App.IndexRoute = Ember.Route.extend({
	model: function() {
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
			if(data.errcode == 0) {
				var d = data.articlelist;
				for (var i = 0; i < 3 && i < d.length; i++) {
					d[i].hot = true;
				}
				controller.set('articlelist_top10', d);
				controller.set('is_loaded_articlelist_top10', true);
			}
		});

		bmy_api_announce_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_announce', data.articlelist);
				controller.set('is_loaded_articlelist_announce', true);
			}
		});

		bmy_api_commend_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_commend', data.articlelist);
				controller.set('is_loaded_articlelist_commend', true);
			}
		});

		bmy_api_sectop_0_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_0', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_0', true);
			}
		});

		bmy_api_sectop_1_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_1', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_1', true);
			}
		});

		bmy_api_sectop_2_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_2', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_2', true);
			}
		});

		bmy_api_sectop_3_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_3', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_3', true);
			}
		});

		bmy_api_sectop_4_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_4', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_4', true);
			}
		});

		bmy_api_sectop_5_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_5', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_5', true);
			}
		});

		bmy_api_sectop_6_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_6', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_6', true);
			}
		});

		bmy_api_sectop_7_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_7', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_7', true);
			}
		});

		bmy_api_sectop_8_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_8', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_8', true);
			}
		});

		bmy_api_sectop_9_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_9', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_9', true);
			}
		});

		bmy_api_sectop_G_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_G', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_G', true);
			}
		});

		bmy_api_sectop_N_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_N', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_N', true);
			}
		});

		bmy_api_sectop_H_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_H', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_H', true);
			}
		});

		bmy_api_sectop_A_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_A', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_A', true);
			}
		});

		bmy_api_sectop_C_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_sectop_C', data.articlelist);
				controller.set('is_loaded_articlelist_sectop_C', true);
			}
		});
	}
});

App.SectionRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);

		controller.set('secname', get_bmysec_name(model.sec_id));

		var bl = new BMYAPIBoardListRequest({ "secstr": model.sec_id });
		bl.pull().then(function(data) {
			controller.set('boardlist', data.boardlist);
			controller.set('is_loaded_boardlist', true);
		});
	},
	renderTemplate: function() {
		this.render('boardlist');
	}
});

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
	}
});

App.BoardPageRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	setupController: function(controller, model) {
		controller.set('model', model);

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
Ember.Handlebars.helper('BMYTime', function(value, option) {
	var t = new moment.unix(value);
	return t.format('YYYY.MM.DD HH:mm');
});

Ember.Handlebars.helper('BMYArticleLink', function(value, option) {
	var link = "<a href='#/section/" + value.secstr + "/" + value.board + "/" + value.aid + "'>" + value.title + "</a>";
	return new Handlebars.SafeString(link);
});

// todo 直接读取 url # 后面的部分，需要改进
Ember.Handlebars.helper('BMYArticleReplyLink', function(value, option) {
	var link = "<a class='btn btn-default' href='#" + location.href.split('#')[1] + "/reply'>回复本文</a>";
	return new Ember.Handlebars.SafeString(link);
});

Ember.Handlebars.helper('BMYBoardLink', function(value, option) {
	var name = (typeof(value.name)=="undefined") ? value.board : value.name;	// 为 article_list 接口准备
	var link = "<a href='#/section/" + value.secstr + "/" + name + "'>" + name + "</a>";
	return new Handlebars.SafeString(link);
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
