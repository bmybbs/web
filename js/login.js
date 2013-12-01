$('button#btn-login').click(function() {
	var userid   = $('input#username').val();
	var passwd   = $('input#password').val();
	var is_rmbme = $('input#chk_remember').val();

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
			}
		},
		error: function(xhr, ajaxOptions, thrownError) {
			alert('oh no!' + xhr.responseText);
			alert(thrownError);
		}
	});
});

$(document).ready(function (){
	var userid = localStorage.userid;
	var sessid = localStorage.sessid;
	var is_local_rmbme = localStorage.is_rmbme;

	if(typeof(is_local_rmbme) == 'undefined' || typeof(userid) == 'undefined' || typeof(sessid) == 'undefined') {
		$('div#login-form').removeClass('hidden');
		return;
	}

	if(is_local_rmbme==null || userid==null || sessid==null) {
		$('div#login-form').removeClass('hidden');
		return;
	}

	var url_checksession = 'api/user/checksession?userid='+userid+'&sessid='+sessid+'&appkey=newweb';

	$.getJSON(url_checksession, function(data) {
		if(data.errcode == 0) {
			$('div#direct-login').removeClass('hidden');
		} else {
			$('div#login-form').removeClass('hidden');
		}
	})
	.fail(function() {
		$('div#login-form').removeClass('hidden');
	});
});
