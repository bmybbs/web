App = Ember.Application.create();

var appkey = 'newweb';

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

$(document).ready(function (){
	var brd_index_out="";
	for(var i=0; i<bmysecstrs.length; i++) {
		brd_index_out += "<div class='bmy-sec'><div class='bmy-sectitle'>" + bmysecstrs[i].id + "区/" + bmysecstrs[i].name + "</div><div>";
		brd_index_out += "<a href='#'>站务公告</a> | <a href='#'>说说咱交大</a>";
		brd_index_out += "</div></div>";
	}
	$('#bmy-brd-index').html(brd_index_out);

	if(typeof(localStorage.userid) == 'undefined')
		$('#bmy-ps-info').html("<a href='#'>登录</a>");
	else {
		$('#bmy-ps-info').html("<a href='#");
		var url_checksession = 'api/user/checksession?userid=' + localStorage.userid + '&sessid' + localStorage.sessid + '&appkey=' + appkey;
		$.getJSON(url_checksession, function(data) {
			if(data.errcode == 0) {
				$('#bmy-ps-info').html(data.userid + " | 站内信 | 消息 | 工具箱 | 注销");
			} else {
				$('#bmy-ps-info').html("<a href='#'>登录</a>");
			}
		})
	}
	var ps_out = "liyuchun [版主] | 站内信(5) | 消息(26) | 工具箱 | 注销";
})

App.Router.map(function() {
	// put your routes here
	this.resource('board', { path: '/board/:board_name' });
});

App.IndexRoute = Ember.Route.extend({

});

App.BoardRoute = Ember.Route.extend({
	model: function(params) {
		return Ember.$.ajax({
			type: "GET",
			url: 'api/board/info?userid=' + localStorage.userid + '&sessid=' + localStorage.sessid + '&bname=' + params.board_name + '&appkey=' + appkey,
			dataType: 'json',
			success: function(data) {
				return data;
			}
		}).then(function(data) {
			return data;
		});
	}
});

Ember.Handlebars.helper('bmyBBM', function(items) {
	// 输出大版主
	var out="";
	for(var i=0; i<4; i++) {
		if(items[i] == null)
			break;
		out = out + " <a href='#'>" + items[i] + "</a>";
	}
	return new Handlebars.SafeString(out);
});

Ember.Handlebars.helper('bmySBM', function(items) {
	// 输出小版主
	var out="";
	for(var i=4; i<items.length; i++) {
		if(items[i] == null)
			break;
		out = out + " <a href='#'>" + items[i] + "</a>";
	}
	return new Handlebars.SafeString(out);
});

Ember.Handlebars.helper('bmyDate', function(tid) {
	var date = new Date(tid*1000);

	return date.toLocaleString();
});

