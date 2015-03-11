import Ember from 'ember';
import BMYAPINotificationListRequest from '../utils/BMYAPINotificationListRequest';

export default Ember.Route.extend({
	model: function() {
		var nlr = new BMYAPINotificationListRequest({  });

		return nlr.pull().then(function(data) {
			return data;
		});
	}
});
