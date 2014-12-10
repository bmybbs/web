import Ember from 'ember';
import ENV from 'bmy-new-web/config/environment';

export default Ember.ObjectController.extend({
	'is_login': true,
	actions: {
		redirect: function() {
			this.transitionToRoute('dashboard');
		},
		login: function() {
			var $ = Ember.$;
			var userid   = $('input#username').val();
			var passwd   = $('input#password').val();
			var is_rmbme = $('input#chk_remember').is(':checked');

			var url_login = ENV.endpoint + 'api/user/login?userid='+userid+'&passwd='+passwd+'&appkey=' + ENV.appkey;
			var c=this;

			$.ajax({
				type: "GET",
				url: url_login,
				dataType: 'json',
				success: function(data) {
					if(data.errcode !== 0) {
						alert(data.errcode);
					} else {
						localStorage.userid = data.userid;
						localStorage.sessid = data.sessid;
						localStorage.token  = data.token;
						localStorage.is_rmbme = is_rmbme;
						localStorage.is_login = true;
						c.controllerFor('application').set('is_login', true);
						c.controllerFor('application').set('userid', data.userid);
						c.transitionToRoute('dashboard');
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
