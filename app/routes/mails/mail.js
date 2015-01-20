import Ember from 'ember';
import BMYAPIMailRequest from 'bmy-new-web/utils/BMYAPIMailRequest';

export default Ember.Route.extend({
	model: function(params) {
		var mail_req = new BMYAPIMailRequest({ "num": params.mail_id });

		return mail_req.pull().then(function(data) {
			return data;
		});
	}
});
