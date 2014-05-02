// common variables
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

function load_personal_status(callback) {
	if(typeof(localStorage.userid) == 'undefined') {
		$('#bmy-ps-info').html("<span id='login-button' class='btn btn-success navbar-btn'>登录</span>");
		if(callback && typeof(callback)=="function")
			callback();
	}
	else {
		var url_query_user = 'api/user/query?userid=' + localStorage.userid + '&sessid=' + localStorage.sessid + '&appkey=' + appkey;
		$.getJSON(url_query_user, function(data) {
			if(data.errcode == 0) {
				var total_notify = data.unread_mail + data.unread_notify;
				$('#bmy-ps-info').html("<div class='btn-group'><button id='nav-user-btn' type='button' class='btn btn-success navbar-btn dropdown-toggle' data-toggle='dropdown'>" + localStorage.userid + "<span class='badge'>" + total_notify + "</span><span class='caret'></span></button><ul class='dropdown-menu' role='menu'><li><a href='#'>站内信<span class='badge pull-right'>" + data.unread_mail + "</span></a></li><li><a href='#'>提醒<span class='badge pull-right'>" + data.unread_notify + "</span></li><li class='divider'></li><li><a href='#'>工具箱</a></li><li class='divider'></li><li><a href='#'>注销</a></li></ul>");
			} else {
				$('#bmy-ps-info').html("<span class='btn btn-success navbar-btn' id='login-button'>登录</span>");
			}

			if(callback && typeof(callback)=="function")
				callback();
		});
	}
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

function load_section_dropdown() {
	for(var i=0; i<bmysecstrs.length; i++) {
		$('<li><a href="#/section/' + bmysecstrs[i].id + '">' + bmysecstrs[i].id + '区&nbsp;' + bmysecstrs[i].name + '</a></li>').appendTo('ul#nav-section-dropdown');
	}
}

// BMYBBS Classes
var BMYAPIRequest = Class.extend({
	async: true,
	postData: { },
	init: function(url) {
		this.url = url;
	},
	varify: function() {
		this.url = this.url + "&appkey=" + appkey;
		if(typeof(localStorage.userid) != "undefined")
			this.url = this.url + "&userid=" + localStorage.userid;
		if(typeof(localStorage.sessid) != "undefined")
			this.url = this.url + "&sessid=" + localStorage.sessid;
	},
	pull: function() {
		this.varify();
		return $.ajax(this.url, {
			type: "GET",
			dataType: 'json',
			async: this.async,
			success: function(data) {
				return data;
			}
		}).then(function(data) {
				return data;
		});
	},
	post: function() {
		this.varify();
		return $.ajax(this.url, {
			type: "POST",
			dataType: 'json',
			data: JSON.stringify(this.postData),
			async: this.async,
			success: function(data) {
				return data;
			}
		}).then(function(data) {
			return data;
		});
	}
});

var BMYAPIArticleRequest = BMYAPIRequest.extend({
	init: function(obj) {
		if((typeof(obj.type) != "undefined") && (obj.type=="RAW"))
			this.url = 'api/article/getRAWContent';
		else
			this.url = 'api/article/getHTMLContent';

		// 初始化参数
		this.url += "?aid="+obj.aid.toString()+"&board="+obj.board;

		if(typeof(obj.async) != "undefined")
			this.async = obj.async;
	}
});

var BMYAPIArticleListRequest = BMYAPIRequest.extend({
	init: function(obj) {
		var baseURL = 'api/article/list?type=';

		if(typeof(obj.type) != "undefined") {
			this.url = baseURL + obj.type;
			switch (obj.type) {
				case "top10":
					break;

				case "sectop":
					if(typeof(obj.secstr) != "undefined")               // warning
						this.url = this.url + "&secstr=" + obj.secstr;
					break;

				case "commend":
					if(typeof(obj.count) != "undefined")
						this.url = this.url + "&count=" + obj.count;
					if(typeof(obj.startnum) != "undefined")
						this.url = this.url + "&startnum=" + obj.startnum;
					break;

				case "announce":
					if(typeof(obj.count) != "undefined")
						this.url = this.url + "&count=" + obj.count;
					if(typeof(obj.startnum) != "undefined")
						this.url = this.url + "&startnum=" + obj.startnum;
					break;

				case "board":
					this.url = this.url + "&board=" + obj.board + "&btype=" + obj.btype;
					if(typeof(obj.count) != "undefined")
						this.url = this.url + "&count=" + obj.count;
					if(typeof(obj.startnum) != "undefined")
						this.url = this.url + "&startnum=" + obj.startnum;
					if(typeof(obj.page) != "undefined")
						this.url = this.url + "&page=" + obj.page;
					break;

				case "thread":
					this.url = this.url + "&board=" + obj.board + "&thread=" + obj.thread;
					if(typeof(obj.count) != "undefined")
						this.url = this.url + "&count=" + obj.count;
					if(typeof(obj.startnum) != "undefined")
						this.url = this.url + "&startnum=" + obj.startnum;
					break;
			}
		}

		if(typeof(obj.async) != "undefined") {
			this.async = obj.async;
		}
	}
});

var BMYAPIBoardRequest = BMYAPIRequest.extend({
	init: function(obj) {
		this.url = 'api/board/info?bname='+obj.name;

		if(typeof(obj.async) != "undefined") {
			this.async = obj.async;
		}
	}
});

var BMYAPIBoardListRequest = BMYAPIRequest.extend({
	init: function(obj) {
		this.url = 'api/board/list?secstr='+obj.secstr;

		// TODO: 排序参数

		if(typeof(obj.async) != "undefined") {
			this.async = obj.async;
		}
	}
});
