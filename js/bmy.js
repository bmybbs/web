var appkey = 'newweb';
var popup;
var bmysecstrs = [
	{ id: '0', name: "本站系统" },
	{ id: '1', name: "交通大学" },
	{ id: '2', name: "开发技术" },
	{ id: '3', name: "电脑应用" },
	{ id: '4', name: "学术科学" },
	{ id: '5', name: "社会科学" },
	{ id: '6', name: "文学艺术" },
	{ id: '7', name: "知性感性" },
	{ id: '8', name: "体育运动" },
	{ id: '9', name: "休闲音乐" },
	{ id: 'G', name: "游戏天地" },
	{ id: 'N', name: "新闻信息" },
	{ id: 'H', name: "乡音乡情" },
	{ id: 'A', name: "校务信息" },
	{ id: 'C', name: "俱乐部区" }
];

function get_bmysec_name(sec_id) {
	return $.grep(bmysecstrs, function(e) {
		return e.id == sec_id;
	})[0].name;
}

function convert_timestamp_to_date_time_string(timestamp) {
	var t = new moment.unix(timestamp);
	return t.format('YYYY.MM.DD HH:mm:ss');
}

function parse_article_list(articles, callback) {
	var out = "";
	for(var i=0; i<articles.length; i++) {
		out += "<div class='dashboard-item'><span><a href='article.html?bname=" + articles[i].board + "&aid=" + articles[i].aid + "'>" + articles[i].title + "</a></span></div>";
	}

	if(callback && typeof(callback)=="function")
		callback(out);
}

function parse_topten_list(articles, callback) {
	var out = "";
	for(var i=0; i<articles.length; i++) {
		out += "<div class='dashboard-item'><div class='dashboard-item-title float-left'><span class='bmy-span-icon bmy-bg-color-";
		out += (i<3) ? "red1" : "gray1";
		out += "'></span><span><a href='article.html?bname=" + articles[i].board + "&aid=" + articles[i].tid + "'>" + articles[i].title + "</a></span><span class='dashboard-item-author'>" + articles[i].author + "@<a href='board.html?bname=" + articles[i].board + "'>" + articles[i].board + "</a></span></div>";
		out += "<div class='float-right'>"+convert_timestamp_to_date_time_string((articles[i].type==1) ? articles[i].tid : articles[i].aid)+"</div>";
		out += "<div class='clear'></div></div>";
	}

	if(callback && typeof(callback)=="function")
		callback(out);
}

function parse_sec_list(articles, callback) {
	var out = "";
	for(var i=0; i<articles.length; i++) {
		out += "<div class='dashboard-item'><div class='dashboard-item-title float-left'><span class='bmy-span-icon bmy-bg-color-gray1'></span>";
		out += "<span><a href='article.html?bname=" + articles[i].board + "&aid=" + articles[i].tid + "'>" + articles[i].title + "</a></span><span class='dashboard-item-author'>" + articles[i].author + "@<a href='board.html?bname=" + articles[i].board + "'>" + articles[i].board + "</a></span></div>";
		out += "<div class='float-right'>"+convert_timestamp_to_date_time_string((articles[i].type==1) ? articles[i].tid : articles[i].aid)+"</div>";
		out += "<div class='clear'></div></div>";
	}

	if(callback && typeof(callback)=="function")
		callback(out);
}

function load_top_board() {
	for(var i=0; i<bmysecstrs.length; i++) {
		var url;
		if(typeof(localStorage.userid)!="undefined" && typeof(localStorage.sessid)!="undefined")
			tb_url = 'api/board/list?secstr='+bmysecstrs[i].id+'&userid='+localStorage.userid+'&sessid='+localStorage.sessid+'&appkey='+appkey;
		else
			tb_url = 'api/board/list?secstr='+bmysecstrs[i].id+'&appkey='+appkey;
		$.ajax({
			type: "GET",
			url: tb_url,
			dataType: 'json',
			async: false,
			success: function(data) {
				var out = "<div class='bmy-sec'><div class='bmy-sectitle'>"+bmysecstrs[i].id+"区/"+bmysecstrs[i].name+"</div><div>";
				var boards = data.boardlist; // 默认人气排序
				var maxnum = (boards.length > 5) ? 5 : boards.length;
				for(var j=0; j<maxnum; j++) {
					out += "<a href='board.html?bname="+boards[j].name+"'>"+boards[j].zh_name+"</a> | ";
				}
				out += " <a class='label label-info' href='#'>更多&gt;&gt;</a></div></div>";
				$(out).appendTo('div#bmy-brd-index');
			}
		});
	}
}

function load_topten() {
	$.ajax({
		type: "GET",
		url: 'api/article/list?type=top10',
		dataType: 'json',
		success: function(data) {
			parse_topten_list(data.articlelist, function(out) {
				$(out).appendTo('div#dashboard-topten');
			});
		}
	});
}

function load_sectop() {
	for(var i=0; i<bmysecstrs.length; i++) {
		$.ajax({
			type: "GET",
			url: 'api/article/list?type=sectop&secstr='+bmysecstrs[i].id,
			dataType: 'json',
			async: false,
			success: function(data) {
				parse_sec_list(data.articlelist, function(out) {
					$(out).appendTo('div#dashboard-sec-'+bmysecstrs[i].id);
				});
			}
		});
	}
}

function load_announce() {
	$.ajax({
		type: "GET",
		url: 'api/article/list?type=announce',
		dataType: 'json',
		success: function(data) {
			parse_article_list(data.articlelist, function(out) {
				$(out).appendTo('div#dashboard-announce');
			});
		}
	});
}

function load_commend() {
	$.ajax({
		type: "GET",
		url: 'api/article/list?type=commend',
		dataType: 'json',
		success: function(data) {
			parse_article_list(data.articlelist, function(out) {
				$(out).appendTo('div#dashboard-commend');
			});
		}
	});
}

function load_personal_status(callback) {
	if(typeof(localStorage.userid) == 'undefined') {
		$('#bmy-ps-info').html("<span id='login-button'>登录</span>");
		if(callback && typeof(callback)=="function")
			callback();
	}
	else {
		var url_query_user = 'api/user/query?userid=' + localStorage.userid + '&sessid=' + localStorage.sessid + '&appkey=' + appkey;
		$.getJSON(url_query_user, function(data) {
			if(data.errcode == 0) {
				$('#bmy-ps-info').html(localStorage.userid + " | 站内信(<span class='bmy-ps-info-num'>" + data.unread_mail + "</span>) | 提醒(<span class='bmy-ps-info-num'>" + data.unread_notify + "</span>) | 工具箱 | <span id='logout-button'>注销</span>");
			} else {
				$('#bmy-ps-info').html("<span id='login-button'>登录</span>");
			}

			if(callback && typeof(callback)=="function")
				callback();
		});
	}
}

function load_board_header(callback) {
	var board_name = $.url().param('bname');
	if(typeof(board_name)=="undefined")
		return;
	$.ajax({
		type: "GET",
		url: 'api/board/info?userid=' + localStorage.userid + '&sessid=' + localStorage.sessid + '&bname=' + board_name + '&appkey=' + appkey,
		dataType: 'json',
		success: function(data) { // TODO:判断失败情况
			var out1 = "<h3><a href='board.html?bname="+data.name+"'>"+data.zh_name+"</a></h3><div><a href='board.html?bname="+data.name+"'>"+data.name+"</a>&nbsp;/&nbsp;"+get_bmysec_name(data.secstr)+"</div>";
			out1 += "<button id='btn-add-to-collection' class='btn btn-primary'>加入收藏夹</button>"; // TODO: 判断是否已存在于收藏夹中
			var out2 = "<div id='header-status'>今日新帖 / <span>"+data.today_new+"</span>&nbsp;&nbsp;在线 / <span>"+data.inboard_num+"</span>&nbsp;&nbsp;人气值 / <span>"+data.score+"</span></div>";
			out2 += "<div>版主 /";
			for(var i=0; i<4; ++i) {
				if(data.bm[i] == null)
					break;
				out2 += " <a href='#'>" + data.bm[i] + "</a>";
			}
			out2 += "</div>";
			if(data.bm[4] != null) {
				out2 += "<div>小版主 /";
				for(var i=4; i<data.bm.length; i++) {
					if(data.bm[i] == null)
						break;
					out2 += " <a href='#'>" + data.bm[i] + "</a>";
				}
				out2 += "</div>";
			}

			$("div#board-header-left").html(out1);
			$("div#board-header-right").html(out2);

			if(data.hot_topic.length>0 && $("div#bmy-board-hot")!=null) {
				for(var i=0; i<data.hot_topic.length; i++) {
					var x=data.hot_topic[i];
					$("<div class='hot-item'><div>HOT</div><a href='#'>" + x.title + "</a><span class='hot-data'>" + convert_timestamp_to_date_time_string(x.tid) + "</span></div>").appendTo("div#bmy-board-hot");
				}
			}

			if(callback && typeof(callback)=="function")
				callback();
		}
	});
}

function load_board_article_list(mode) {
	var board_name = $.url().param('bname');
	if(typeof(board_name)=="undefined")
		return;
	$.ajax({
		type: "GET",
		url: 'api/article/list?type=board&board='+board_name+'&btype='+mode+'&userid='+localStorage.userid+'&sessid='+localStorage.sessid+'&appkey='+appkey,
		dataType: 'json',
		success: function (data) {
			var article_table = $("<table class='table table-striped table-condensed'/>");
			var e;
			for(var i=0; i<data.articlelist.length; i++) {
				e = data.articlelist[i];
				if(mode=="t")
					$("<tr><td>"+i+"</td><td>"+e.title+"</td><td>"+e.author+"</td><td>"+convert_timestamp_to_date_time_string(e.tid)+"</td><td>"+e.th_num+"</td></tr>").appendTo(article_table);
				else
					$("<tr><td>"+i+"</td><td><a href='article.html?bname="+e.board+"&aid="+e.aid+"'>"+e.title+"</a></td><td>"+e.author+"</td><td>"+convert_timestamp_to_date_time_string(e.aid)+"</td></tr>").appendTo(article_table);
			}
			$(article_table).appendTo("div#article-list");
		}
	});
}

function bind_login_button(callback) {
	$('button#btn-login').click(function() {
		var userid   = $('input#username').val();
		var passwd   = $('input#password').val();
		var is_rmbme = $('input#chk_remember').is(':checked');

		var url_login = 'api/user/login?userid='+userid+'&passwd='+passwd+'&appkey=newweb';

		$.ajax({
			type: "GET",
			url: url_login,
			dataType: 'json',
			success: function(data) {
				if(data.errcode != 0) {
					alert(data.errcode);
				} else {
					localStorage.userid = data.userid;
					localStorage.sessid = data.sessid;
					localStorage.token  = data.token;
					localStorage.is_rmbme = is_rmbme;
					if(callback && typeof(callback)=="function") {
						callback();
					}
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert('oh no!' + xhr.responseText);
				alert(thrownError);
			}
		});
	});
}

function bind_logout_button(callback) {
	$('span#logout-button').click(function() {
		var url_logout = 'api/user/logout?userid=' + localStorage.userid + '&sessid=' + localStorage.sessid + '&appkey=' + appkey;
		$.ajax({
			type: "GET",
			url: url_logout,
			dataType: 'json',
			success: function(data) {
				if(data.errcode != 0) {
					alert(data.errcode);
				} else {
					localStorage.removeItem("userid");
					localStorage.removeItem("sessid");
					localStorage.removeItem("token");
					localStorage.removeItem("is_rmbme");

					if(callback && typeof(callback)=="function") {
						callback();
					}
				}
			}
		});
	});
}

function bind_post_button() {
	$('a#post-button').click(function() {
		window.postbox = $('#post-box').bPopup({
			speed: 650,
			transition: 'slideIn'
		});
	});

	$('button#btn-post').click(function() {
		$.ajax({
			type: "POST",
			url: "api/article/post?board="+$.url().param('bname')+"&title="+encodeURIComponent($("#article-title").val())+"&userid="+localStorage.userid+"&sessid="+localStorage.sessid+"&appkey="+appkey+"&token="+localStorage.token,
			data: "content="+encodeURIComponent($("#article-content").val()),
			async: false,
			dataType: "json",
			success: function(data) {
				if(data.errcode == 0) {
					localStorage.token = data.token;
					window.postbox.close();
					document.location.href = 'article.html?bname='+$.url().param('bname')+'&aid='+data.aid;
				} else {
					window.postbox.close();
					alert(data.errcode);
				}
			},
			error: function(xhr, option, err) {
				alert(err);
				window.postbox.close();
			}
		});
	});
}

function resize_section() {
	var height_content = $('section#bmy-content').height();
	var height_sidebar = $('section#bmy-sidebar-left').height();
	if(height_sidebar < height_content + 500)
		$('section#bmy-sidebar-left').height(height_content+500);
}

function BMYArticle(param) {
	this.aid = param.aid;
	this.board = param.board;
	this.num = (typeof(param.num)=="undefined") ? -1 : param.num;
	this.is_threadmode = (typeof(param.mode)=="undefined") ? false : param.mode;
	this.html_base = "<div class='article-item' id='article-" + this.aid + "'><div class='float-left article-author-info'><div class='article-author' /><div class='article-author-func' /></div><div class='float-right article-main'><div class='article-title' /><div class='article-body' /></div><div class='clear' /></div>";

	this.Show = function() {
		$(this.html_base).appendTo("section#bmy-article");
		var that = this;
		$.ajax({
			type: "GET",
			url: "api/article/getHTMLContent?aid="+that.aid+"&board="+that.board+"&userid="+localStorage.userid+"&sessid="+localStorage.sessid+"&appkey="+appkey,
			dataType: "json",
			async: false,
			success: function(data) {
				if(data.errcode!=0)
					return;

				$('div#article-'+that.aid+' .article-author').html(data.author);
				$('div#article-'+that.aid+' .article-author-func').html("<a class='sendmail-btn' id='sendmail-"+data.author+"' href='#'>发送站内信</a><a class='addfriend-btn' id='addfriend-"+data.author+"' href='#'>加为好友</a>");
				var title_div = "<div class='float-left'>"+data.title+"</div>";
				title_div += "<div class='float-right btn-group'><button type='button' class='btn'>回复本文</button>";
				if(that.is_threadmode)
					title_div += "</div>";
				else {
					title_div += "<button type='button' class='btn dropdown-toggle'><span class='caret'></span><span class='sr-only'>Toggle Dropdown</span></button>";
					title_div += "<ul class='dropdown-menu' role='menu'><li><a href='#'>同主题由此展开</a></li><li class='divider'></li><li><a href='#'>同主题列表</a></li><li><a href='#'>同主题从楼主展开</a></li></ul></div>";
				}
				title_div += "<div class='clear' />";
				$('div#article-'+that.aid+' .article-title').html(title_div);
				$('div#article-'+that.aid+' .article-body').html(data.content);
			}
		});
	}
}

function bmy_app_init() {
	load_personal_status(function() {
		$('#login-button').bind('click', function(e) {
			e.preventDefault();
			popup = $('#login-box').bPopup({
				modalClose: false,
				opacity: 0.6,
				positionStyle: 'fixed'
			});
		});

		bind_logout_button(function() {
			document.location.href = 'index.html';
		});

		bind_login_button(function() {
			popup.close();
		});
	});

	load_top_board();

	setInterval(load_personal_status, 30000);
	setInterval(resize_section, 5000);
}
