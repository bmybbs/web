import Ember from 'ember';
import BMYAPIUserQueryRequest from '../utils/BMYAPIUserQueryRequest';

var $ = Ember.$;

function load_personal_status(callback) {
	if(typeof(localStorage.userid) === 'undefined') {
		$('#bmy-ps-info').html("<span id='login-button' class='btn btn-success navbar-btn'>登录</span>");
		if(callback && typeof(callback)==="function")
			callback();
	}
	else {
		var query_req = new BMYAPIUserQueryRequest({ });
		query_req.pull().then(function(data) {
			if(data.errcode === 0) {
				var total_notify = data.unread_mail + data.unread_notify;
				$('#bmy-ps-info').html("<div class='btn-group'><button id='nav-user-btn' type='button' class='btn btn-success navbar-btn dropdown-toggle' data-toggle='dropdown'>" + localStorage.userid + "<span class='badge'>" + total_notify + "</span><span class='caret'></span></button><ul class='dropdown-menu' role='menu'><li><a href='#'><span class='glyphicon glyphicon-envelope bmy-span-icon'></span>站内信<span class='badge pull-right'>" + data.unread_mail + "</span></a></li><li><a href='#'><span class='glyphicon glyphicon-bullhorn bmy-span-icon'></span>提醒<span class='badge pull-right'>" + data.unread_notify + "</span></li><li class='divider'></li><li><a href='#'><span class='glyphicon glyphicon-cog bmy-span-icon'></span>工具箱</a></li><li class='divider'></li><li><span id='logout-button'><span class='glyphicon glyphicon-off bmy-span-icon'></span>注销</span></li></ul>");
			} else {
				$('#bmy-ps-info').html("<span class='btn btn-success navbar-btn' id='login-button'>登录</span>");
			}

			if(callback && typeof(callback)==="function")
				callback();
		});
	}
}

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
		setInterval(load_personal_status, 30000);
	}
});
