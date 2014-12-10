import Ember from 'ember';
import ENV from 'bmy-new-web/config/environment';

var $ = Ember.$;

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
			if($('#commandbar input').val().length > 0)
				$('#commandbar').addClass('open');
			else
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
