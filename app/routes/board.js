import Ember from 'ember';
import BMYAPIBoardRequest from 'bmy-new-web/utils/BMYAPIBoardRequest';
import get_bmysec_name from 'bmy-new-web/utils/BMYGetSecName';

export default Ember.Route.extend({
	queryParams: {
		page: { refreshModel: true },
		readtype: { refreshModel: true }
	},
	model: function(params) {
		var board_req = new BMYAPIBoardRequest({ "name": params.board_id });

		return Ember.RSVP.hash({
			params: params,
			header: board_req.pull().then(function(data){
				return data;
			})
		});
	},
	setupController: function(controller, model) {
		this._super(controller, model);

		controller.set('secname', get_bmysec_name(model.header.secstr));
		controller.set('hasSmallBM', model.header.bm[4]);

		controller.set('hasHotItems', (model.header.hot_topic.length>0));

		controller.set('pages', Math.ceil(model.header.article_num / 20));
	}
});
