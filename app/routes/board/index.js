import Ember from 'ember';
import BMYAPIArticleListRequest from 'bmy-new-web/utils/BMYAPIArticleListRequest';

export default Ember.Route.extend({
	model: function() {
		var params = this.modelFor('board').params;
		var al = new BMYAPIArticleListRequest({
			"type": "board",
			"board": params.board_id,
			"btype": (typeof(params.readtype) === "undefined" || params.readtype !== "thread") ? "t" : "0",
			"page": (typeof(params.page) !== "undefined" && params.page !== null) ? params.page : 1
		});
		var bt = new BMYAPIArticleListRequest({ "type": "boardtop", "board": params.board_id });

		return Ember.RSVP.hash({
			articlelist: al.pull().then(function(data) {
				for(var i=0; i<data.articlelist.length; ++i)
					data.articlelist[i].secstr = params.section_id;

				return data.articlelist.sort(function(a, b) {
					return b.aid - a.aid;
				});
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

		if(model.boardtop) {
			controller.set('hasBoardTop', true);
		}
	}
});
