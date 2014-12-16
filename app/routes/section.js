import Ember from 'ember';
import BMYAPIBoardListRequest from '../utils/BMYAPIBoardListRequest';
import ENV from 'bmy-new-web/config/environment';

function get_bmysec_name(sec_id) {
	return Ember.$.grep(ENV.bmysecstrs, function(e) {
		return e.id === sec_id;
	})[0].name;
}

export default Ember.Route.extend({
	model: function(params) {
		var bl = new BMYAPIBoardListRequest({ "secstr": params.section_id });
		return Ember.RSVP.hash({
			boardlist: bl.pull().then(function(data) {
				if(data.errcode === 0) {
					return data.boardlist;
				}
			}),
			section_name: get_bmysec_name(params.section_id),
			section_id: params.section_id
		});
	},
	renderTemplate: function() {
		this.render('boardlist');
	}
});
