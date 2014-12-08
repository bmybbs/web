// common variables
var popup;

function get_bmysec_name(sec_id) {
	return $.grep(bmysecstrs, function(e) {
		return e.id == sec_id;
	})[0].name;
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

