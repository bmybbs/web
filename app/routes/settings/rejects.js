import Ember from 'ember';
import BMYAPIUserRejectsListRequest from '../../utils/BMYAPIUserRejectsListRequest';

export default Ember.Route.extend({
	model: function() {
		var uflr = new BMYAPIUserRejectsListRequest({ });
		return uflr.pull().then(function(data) {
			if(data.errcode === 0) {
				return data;
			}
		});
	}
});
