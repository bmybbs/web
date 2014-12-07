import Ember from 'ember';
import BMYAPIUserQueryRequest from '../utils/BMYAPIUserQueryRequest';

var $ = Ember.$;
var query_req = new BMYAPIUserQueryRequest({ });

export default Ember.Route.extend({
	model: function() {
		return {
			'userid': localStorage.userid,
			'sessid': localStorage.sessid,
			'token'	: localStorage.token
		};
	},
	setupController: function(controller, model) {
		controller.set('model', model);

		query_req.pull().then(function(data) {
			if(data.errcode === 0) {
				// 设置用户信息
				controller.set('total_notify', data.unread_mail + data.unread_notify);
				controller.set('unread_mail', data.unread_mail);
				controller.set('unread_notify', data.unread_notify);
			}
			controller.set('is_login', (data.errcode === 0));
			localStorage.is_login = (data.errcode === 0);
		});

		setInterval(function() {
			query_req.pull().then(function(data) {
				if(data.errcode === 0) {
					// 设置用户信息
					controller.set('total_notify', data.unread_mail + data.unread_notify);
					controller.set('unread_mail', data.unread_mail);
					controller.set('unread_notify', data.unread_notify);
				}
				localStorage.is_login = (data.errcode === 0);
				controller.set('is_login', (data.errcode === 0));
			});
		}, 30000);
	}
});
