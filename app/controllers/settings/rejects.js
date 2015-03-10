import Ember from 'ember';
import BMYAPIUserRejectsListRequest from '../../utils/BMYAPIUserRejectsListRequest';
import BMYAPIUserRejectsAddRequest from '../../utils/BMYAPIUserRejectsAddRequest';
import BMYAPIUserRejectsDelRequest from '../../utils/BMYAPIUserRejectsDelRequest';

export default Ember.ObjectController.extend({
	friendId: '',
	friendExp: '',
	actions: {
		addFriend: function() {
			var self = this;
			var ufa_req = new BMYAPIUserRejectsAddRequest({ queryid: this.get('friendId'), explain: this.get('friendExp') });
			ufa_req.pull().then(function(data) {
				if(data.errcode === 0) {
					self.set('friendId', '');
					self.set('friendExp', '');

					var uflr = new BMYAPIUserRejectsListRequest({ });
					uflr.pull().then(function(data) {
						self.set('model', data);
					});
				} else if(data.errcode === 100000) {
					alert('没有找到相关用户...您再瞅瞅？');
				} else if(data.errcode === 100009) {
					alert('已达到最大记录数，无法添加。');
				} else if(data.errcode === 100010) {
					alert('记录已存在，不用再添加啦！');
				} else {
					alert('系统出错啦 :(');
				}
			});
		},
		delFriend: function(userid) {
			var self = this;
			var ufd_req = new BMYAPIUserRejectsDelRequest({ queryid: userid });
			ufd_req.pull().then(function(data) {
				if(data.errcode === 0) {
					Ember.$('tr#' + userid).remove();
				} else if(data.errcode === 100000) {
					alert('没有找到相关用户...您再瞅瞅？');
				} else if(data.errcode === 100011) {
					alert('记录不存在，无法删除哦~');
				} else {
					alert('系统出错啦 :(');
				}
			});
		}
	}
});
