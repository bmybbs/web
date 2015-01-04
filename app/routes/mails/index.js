import Ember from 'ember';
import BMYAPIMailListRequest from 'bmy-new-web/utils/BMYAPIMailListRequest';

export default Ember.Route.extend({
	model: function() {
		var mail_list_req = new BMYAPIMailListRequest({ });

		return mail_list_req.pull().then(function(data) {
			return data;
		});
	}
});
