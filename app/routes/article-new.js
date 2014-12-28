import Ember from 'ember';
import BMYAPIBoardRequest from 'bmy-new-web/utils/BMYAPIBoardRequest';
import get_bmysec_name from 'bmy-new-web/utils/BMYGetSecName';

export default Ember.Route.extend({
	model: function(params) {
		var board_req = new BMYAPIBoardRequest({ "name": params.board_id });

		return Ember.RSVP.hash({
			header: board_req.pull().then(function(data) {
				return data;
			}),
			article: {
				"can_reply": 1,
				"board": params.board_id,
				"author": localStorage.userid,
				"thread": 0,
				"num": 0,
				"content": "",
				"title": "",
				"ref": "",
				"rid": "",
				"posttype": "NewPost"
			},
			params: params
		});
	},
	setupController: function(controller, model) {
		this._super(controller, model);

		controller.set('secname', get_bmysec_name(model.header.secstr));
		controller.set('hasSmallBM', model.header.bm[4]);
	},
	renderTemplate: function() {
		this.render('article-edit');
	}
});
