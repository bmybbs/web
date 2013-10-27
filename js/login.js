$('button#btn-login').click(function() {
	var userid   = $('input#username').val();
	var passwd   = $('input#password').val();
	var is_rmbme = $('input#chk_remember').val();
	var exp_day  = (is_rmbme) ? 7 : 0;

	var url_login = 'api/user/login?userid='+userid+'&passwd='+passwd+'&appkey=newweb';

	$.ajax({
		type: "GET",
		url: url_login,
		dataType: 'json',
		success: function(data) {
			if(data.errcode != 0) {
				alert(data.errcode);
			} else {
				$.cookie('userid', data.UserID, {expires: exp_day});
				$.cookie('sessid', data.SessionID, {expires: exp_day});
				$.cookie('token', data.Token, {expires: exp_day});
			}
		},
		error: function(xhr, ajaxOptions, thrownError) {
			alert('oh no!' + xhr.responseText);
			alert(thrownError);
		}
	});
});

$(document).ready(function (){
	var userid = $.cookie('userid');
	var sessid = $.cookie('sessid');

	if(userid==null || sessid==null) {
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
