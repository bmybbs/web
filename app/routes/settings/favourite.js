import Ember from 'ember';
import BMYAPIBoardFavListRequest from '../../utils/BMYAPIBoardFavListRequest';

export default Ember.Route.extend({
	model: function() {
		var bflr = new BMYAPIBoardFavListRequest({ });
		return bflr.pull().then(function(data) {
			return data;
		});
	}
});
