import Ember from 'ember';
import BMYAPIUserFriendsListRequest from '../../utils/BMYAPIUserFriendsListRequest';

export default Ember.Route.extend({
	model: function() {
		var uflr = new BMYAPIUserFriendsListRequest({ });
		return uflr.pull().then(function(data) {
			if(data.errcode === 0) {
				return data;
			}
		});
	}
});
