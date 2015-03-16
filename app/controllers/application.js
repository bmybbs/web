import Ember from 'ember';
import ENV from 'bmy-new-web/config/environment';
import BMYAPIUserAutocompleteRequest from '../utils/BMYAPIUserAutocompleteRequest';
import BMYAPIBoardAutocompleteRequest from '../utils/BMYAPIBoardAutocompleteRequest';

var $ = Ember.$;
var lazySearchTimer = 0;
var MAX_DISPLAY_COUNT = 3;
var doLasySearch = function(search_string, controller) {
	if(lazySearchTimer) {
		clearTimeout(lazySearchTimer);
	}

	lazySearchTimer = setTimeout(function() {
		var uac_req = new BMYAPIUserAutocompleteRequest({ 'search_str': search_string });
		var bac_req = new BMYAPIBoardAutocompleteRequest({ 'search_str': search_string });

		uac_req.pull().then(function(data) {
			controller.set('user_array', []);
			controller.set('hasMoreUsers', false);

			if(data.errcode===0 && typeof(data.user_array)!=="undefined") {
				var i = 0,
					user_array = [],
					total_num = data.user_array.length;
				for(; i<MAX_DISPLAY_COUNT && i<total_num; ++i) {
					user_array.push(data.user_array[i]);
				}

				controller.set('user_array', user_array);
				if(total_num > MAX_DISPLAY_COUNT) {
					controller.set('hasMoreUsers', true);
				}
			}
		});

		bac_req.pull().then(function(data) {
			controller.set('board_array', []);
			controller.set('hasMoreBoards', false);

			if(data.errcode===0 && typeof(data.board_array)!=="undefined") {
				var i = 0,
					board_array = [],
					total_num = data.board_array.length;
				for(; i<MAX_DISPLAY_COUNT && i<total_num; ++i) {
					board_array.push(data.board_array[i]);
				}

				controller.set('board_array', board_array);
				if(total_num > MAX_DISPLAY_COUNT) {
					controller.set('hasMoreBoards', true);
				}
			}
		});
	}, 200);
};

export default Ember.ObjectController.extend({
	hasMoreUsers: false,
	hasMoreBoards: false,
	searchcommand: '',
	user_array: [],
	board_array: [],
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

				doLasySearch($('#commandbar input').val(), this);
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
