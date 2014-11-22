// common variables
var popup;

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
				$('#bmy-ps-info').html("<div class='btn-group'><button id='nav-user-btn' type='button' class='btn btn-success navbar-btn dropdown-toggle' data-toggle='dropdown'>" + localStorage.userid + "<span class='badge'>" + total_notify + "</span><span class='caret'></span></button><ul class='dropdown-menu' role='menu'><li><a href='#'><span class='glyphicon glyphicon-envelope bmy-span-icon'></span>站内信<span class='badge pull-right'>" + data.unread_mail + "</span></a></li><li><a href='#'><span class='glyphicon glyphicon-bullhorn bmy-span-icon'></span>提醒<span class='badge pull-right'>" + data.unread_notify + "</span></li><li class='divider'></li><li><a href='#'><span class='glyphicon glyphicon-cog bmy-span-icon'></span>工具箱</a></li><li class='divider'></li><li><span id='logout-button'><span class='glyphicon glyphicon-off bmy-span-icon'></span>注销</span></li></ul>");
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
