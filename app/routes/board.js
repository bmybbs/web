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
	model: function(params) {
		var board_req = new BMYAPIBoardRequest({ "name": params.board_id });
		var al = new BMYAPIArticleListRequest({ "type": "board", "board": params.board_id, "btype":"0"});

		return Ember.RSVP.hash({
			header: board_req.pull().then(function(data){
				return data;
			}),
			articlelist: al.pull().then(function(data) {
				for(var i=0; i<data.articlelist.length; ++i)
					data.articlelist[i].section_id = params.section_id;

				return data.articlelist;
			})
		});
	},
	setupController: function(controller, model) {
		this._super(controller, model);

		console.log(model.header.secstr);
		controller.set('secname', get_bmysec_name(model.header.secstr));
		console.log(model.header.bm[4]);
		controller.set('hasSmallBM', model.header.bm[4]);
	}
});
