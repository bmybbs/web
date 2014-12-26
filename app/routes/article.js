import Ember from 'ember';
import BMYAPIBoardRequest from 'bmy-new-web/utils/BMYAPIBoardRequest';
import BMYAPIArticleRequest from 'bmy-new-web/utils/BMYAPIArticleRequest';
import get_bmysec_name from 'bmy-new-web/utils/BMYGetSecName';

export default Ember.Route.extend({
	model: function(params) {
		var board_req = new BMYAPIBoardRequest({ "name": params.board_id });
		var article_req = new BMYAPIArticleRequest({ "aid": params.article_id, "board": params.board_id });

		return Ember.RSVP.hash({
			header: board_req.pull().then(function(data) {
				return data;
			}),
			article: article_req.pull().then(function(data) {
				if(data.errcode === 0)
					return data;
			})
		});
	},
	setupController: function(controller, model) {
		this._super(controller, model);

		controller.set('secname', get_bmysec_name(model.header.secstr));
		controller.set('hasSmallBM', model.header.bm[4]);
	}
});
