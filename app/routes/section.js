import Ember from 'ember';
import BMYAPIBoardListRequest from '../utils/BMYAPIBoardListRequest';
import get_bmysec_name from 'bmy-new-web/utils/BMYGetSecName';

export default Ember.Route.extend({
	model: function(params) {
		var bl = new BMYAPIBoardListRequest({ "secstr": params.section_id });
		return Ember.RSVP.hash({
			boardlist: bl.pull().then(function(data) {
				if(data.errcode === 0) {
					return data.boardlist;
				}
			}),
			section_name: get_bmysec_name(params.section_id)
		});
	},
	renderTemplate: function() {
		this.render('boardlist');
	}
});
