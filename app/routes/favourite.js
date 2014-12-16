import Ember from 'ember';
import BMYAPIBoardListRequest from '../utils/BMYAPIBoardListRequest';

export default Ember.Route.extend({
	model: function() {
		var bl = new BMYAPIBoardListRequest({ "secstr": "fav" });
		return Ember.RSVP.hash({
			boardlist: bl.pull().then(function(data) {
				if(data.errcode === 0) {
					return data.boardlist;
				}
			}),
			section_name: "收藏夹"
		});
	},
	renderTemplate: function() {
		this.render('boardlist');
	}
});
