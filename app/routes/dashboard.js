import Ember from 'ember';
import BMYAPIArticleListRequest from '../utils/BMYAPIArticleListRequest';
import ENV from 'bmy-new-web/config/environment';

/* global HashMap */

export default Ember.Route.extend({
	model: function() {
		var bmy_api_top10_req    = new BMYAPIArticleListRequest({ type: "top10" });
		var bmy_api_announce_req = new BMYAPIArticleListRequest({ type: "announce" });
		var bmy_api_commend_req  = new BMYAPIArticleListRequest({ type: "commend" });

		var bmy_api_sec_reqs = new HashMap();

		for(var i=0; i<ENV.bmysecstrs.length; ++i) {
			bmy_api_sec_reqs.set(ENV.bmysecstrs[i].id, new BMYAPIArticleListRequest({ type: "sectop", secstr: ENV.bmysecstrs[i].id }));
		}

		return Ember.RSVP.hash({
			top10: bmy_api_top10_req.pull().then(function(data) {
				if(data.errcode === '0') {
					var d = data.articlelist;
					for (var i = 0; i < 3 && i < d.length; i++) {
						d[i].hot = true;
					}
					return d;
				}
			}),
			announce: bmy_api_announce_req.pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			commend: bmy_api_commend_req.pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_0: bmy_api_sec_reqs.get('0').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_1: bmy_api_sec_reqs.get('1').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_2: bmy_api_sec_reqs.get('2').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_3: bmy_api_sec_reqs.get('3').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_4: bmy_api_sec_reqs.get('4').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_5: bmy_api_sec_reqs.get('5').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_6: bmy_api_sec_reqs.get('6').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_7: bmy_api_sec_reqs.get('7').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_8: bmy_api_sec_reqs.get('8').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_9: bmy_api_sec_reqs.get('9').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_G: bmy_api_sec_reqs.get('G').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_N: bmy_api_sec_reqs.get('N').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_H: bmy_api_sec_reqs.get('H').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_A: bmy_api_sec_reqs.get('A').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			}),
			articlelist_sectop_C: bmy_api_sec_reqs.get('C').pull().then(function(data) {
				if(data.errcode === '0')
					return data.articlelist;
			})
		});
	}
});
