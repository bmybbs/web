import Ember from 'ember';
import ENV from 'bmy-new-web/config/environment';
import BMYAPIUserAutocompleteRequest from '../utils/BMYAPIUserAutocompleteRequest';
import BMYAPIBoardAutocompleteRequest from '../utils/BMYAPIBoardAutocompleteRequest';

var $ = Ember.$;
var lazySearchTimer = 0;
var MAX_DISPLAY_COUNT = 3;
var doLasySearch = function(search_string) {
	if(lazySearchTimer) {
		clearTimeout(lazySearchTimer);
	}

	lazySearchTimer = setTimeout(function() {
		var uac_req = new BMYAPIUserAutocompleteRequest({ 'search_str': search_string });
		var bac_req = new BMYAPIBoardAutocompleteRequest({ 'search_str': search_string });
		var re = new RegExp( '(' + search_string + ')', "gi");

		uac_req.pull().then(function(data) {
			$('li.uac').remove();

			if(data.errcode===0 && typeof(data.user_array)!=="undefined") {
				var i = 0,
					html_str = "",
					total_num = data.user_array.length;
				for(; i<MAX_DISPLAY_COUNT && i<total_num; ++i) {
					html_str += "<li class='uac' id='uac_'" + i + "><a href='#'>" + data.user_array[i].replace(re, "<strong>$1</strong>") + "</a></li>";
				}

				$('li#search_result_user').after(html_str);

				if(total_num > MAX_DISPLAY_COUNT) {
					$('li#uac_2').after("<li class='uac' id='uac_more'><a href='#'>搜索更多关于 " + search_string + " 的用户</a></li>");
				}
			}
		});

		bac_req.pull().then(function(data) {
			$('li.bac').remove();

			if(data.errcode===0 && typeof(data.board_array)!=="undefined") {
				var i = 0,
					html_str = "",
					total_num = data.board_array.length;
				for(; i<MAX_DISPLAY_COUNT && i<total_num; ++i) {
					html_str += "<li class='bac' id='bac_'" + i + "><a href='#'>" + data.board_array[i].replace(re, "<strong>$1</strong>") + "</a></li>";
				}

				$('li#search_result_board').after(html_str);

				if(total_num > MAX_DISPLAY_COUNT) {
					$('li#uac_2').after("<li class='bac' id='bac_more'><a href='#'>搜索更多关于 " + search_string + " 的版面</a></li>");
				}
			}
		});
	}, 200);
};

Ember.TextField.reopen({
	keyUp: function(event) {
		this.sendAction('key-up', this, event);
	}
});

export default Ember.ObjectController.extend({
	searchcommand: '',
	actions: {
		commandbarFocusInInput: function() {
			if($('#commandbar input').val().length > 0)
				$('#commandbar').addClass('open');
		},
		commandbarFocusOutInput: function() {
			$('#commandbar').removeClass('open');
		},
		commandbarKeyUp: function() {
			if($('#commandbar input').val().length > 0) {
				$('#commandbar').addClass('open');

				doLasySearch($('#commandbar input').val());
			} else
				$('#commandbar').removeClass('open');
		},
		logout: function() {
			var url_logout = ENV.endpoint + 'api/user/logout?userid=' + localStorage.userid + '&sessid=' + localStorage.sessid + '&appkey=' + ENV.appkey;
			var c = this;
			$.ajax({
				type: "GET",
				url: url_logout,
				dataType: 'json',
				success: function(data) {
					if(data.errcode !== 0)
						alert(data.errcode);
					else {
						localStorage.removeItem("userid");
						localStorage.removeItem("sessid");
						localStorage.removeItem("token");
						localStorage.removeItem("is_rmbme");
						localStorage.is_login = false;
						c.controllerFor('application').set('is_login', false);
						c.controllerFor('index').set('is_login', false);

						c.transitionToRoute('index');
					}
				},
				error: function(xhr, ajaxOptions, thrownError) {
					alert('服务器好像开小差了，一会儿再试试！');
					console.log('Login Error: ' + xhr.responseText);
				}
			});
		}
	}
});
