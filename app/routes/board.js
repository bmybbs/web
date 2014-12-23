import Ember from 'ember';
import BMYAPIBoardRequest from 'bmy-new-web/utils/BMYAPIBoardRequest';
import BMYAPIArticleListRequest from 'bmy-new-web/utils/BMYAPIArticleListRequest';
import ENV from 'bmy-new-web/config/environment';

function get_bmysec_name(sec_id) {
	return Ember.$.grep(ENV.bmysecstrs, function(e) {
		return e.id === sec_id;
	})[0].name;
}

export default Ember.Route.extend({
	queryParams: {
		page: { refreshModel: true },
		readtype: { refreshModel: true }
	},
	model: function(params) {
		var board_req = new BMYAPIBoardRequest({ "name": params.board_id });
		var al = new BMYAPIArticleListRequest({
			"type": "board",
			"board": params.board_id,
			"btype": (typeof(params.readtype) !== "undefined" && params.readtype === "thread") ? "t" : "0",
			"page": (typeof(params.page) !== "undefined" && params.page !== null) ? params.page : 1
		});
		var bt = new BMYAPIArticleListRequest({ "type": "boardtop", "board": params.board_id });

		return Ember.RSVP.hash({
			header: board_req.pull().then(function(data){
				return data;
			}),
			articlelist: al.pull().then(function(data) {
				for(var i=0; i<data.articlelist.length; ++i)
					data.articlelist[i].secstr = params.section_id;

				return data.articlelist;
			}),
			boardtop: bt.pull().then(function(data) {
				if(data.errcode === 0)
					return data.articlelist;
				else
					return null;
			})
		});
	},
	setupController: function(controller, model) {
		this._super(controller, model);

		controller.set('secname', get_bmysec_name(model.header.secstr));
		controller.set('hasSmallBM', model.header.bm[4]);

		controller.set('hasHotItems', (model.header.hot_topic.length>0));

		if(model.boardtop) {
			controller.set('hasBoardTop', true);
		}
	}
});
