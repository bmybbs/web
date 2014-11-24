import Ember from 'ember';
import BMYAPIArticleListRequest from '../utils/BMYAPIArticleListRequest';
import ENV from 'bmy-new-web/config/environment';

export default Ember.Route.extend({
	model: function() {
		return [];
	},
	setupController: function(controller, model) {
		var bmy_api_top10_req    = new BMYAPIArticleListRequest({ type: "top10" });
		var bmy_api_announce_req = new BMYAPIArticleListRequest({ type: "announce" });
		var bmy_api_commend_req  = new BMYAPIArticleListRequest({ type: "commend" });
		var bmy_api_sec_reqs = [];
		var i;

		for(i=0; i<ENV.bmysecstrs.length; ++i) {
			bmy_api_sec_reqs.push(new BMYAPIArticleListRequest({ type: "sectop", secstr: ENV.bmysecstrs[i].id }));
		}

		bmy_api_top10_req.pull().then(function(data) {
			if(data.errcode == 0) {
				var d = data.articlelist;
				for (var i = 0; i < 3 && i < d.length; i++) {
					d[i].hot = true;
				}
				controller.set('articlelist_top10', d);
				controller.set('is_loaded_articlelist_top10', true);
			}
		});

		bmy_api_announce_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_announce', data.articlelist);
				controller.set('is_loaded_articlelist_announce', true);
			}
		});

		bmy_api_commend_req.pull().then(function(data) {
			if(data.errcode == 0) {
				controller.set('articlelist_commend', data.articlelist);
				controller.set('is_loaded_articlelist_commend', true);
			}
		});

		for(i=0; i<ENV.bmysecstrs.length; ++i) {
			bmy_api_sec_reqs[i].pull().then((function(data) {
				if(data.errcode == 0) {
					controller.set('articlelist_sectop_'+ENV.bmysecstrs[i].id, data.articlelist);
					controller.set('is_loaded_articlelist_sectop_'+ENV.bmysecstrs[i].id, true);
				}
			})());
		} // TODO 此处讨论区热门话题的闭包方法有待测试。
	}
});
