import Ember from 'ember';
import BMYAPIUserQueryRequest from '../utils/BMYAPIUserQueryRequest';
import ENV from 'bmy-new-web/config/environment';

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
		this._super(controller, model);

		var c = this;
		controller.set('sections', ENV.bmysecstrs);
		query_req.pull().then(function(data) {
			if(data.errcode === 0) {
				// 设置用户信息
				controller.set('total_notify', data.unread_mail + data.unread_notify);
				controller.set('unread_mail', data.unread_mail);
				controller.set('unread_notify', data.unread_notify);
			}
			controller.set('is_login', (data.errcode === 0));
			c.controllerFor('index').set('is_login', (data.errcode === 0));
		});

		setInterval(function() {
			query_req.pull().then(function(data) {
				if(data.errcode === 0) {
					// 设置用户信息
					controller.set('total_notify', data.unread_mail + data.unread_notify);
					controller.set('unread_mail', data.unread_mail);
					controller.set('unread_notify', data.unread_notify);
				}
				controller.set('is_login', (data.errcode === 0));
				c.controllerFor('index').set('is_login', (data.errcode === 0));
			});
		}, 30000);
	}
});
