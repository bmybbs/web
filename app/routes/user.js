import Ember from 'ember';
import BMYAPIUserQueryRequest from 'bmy-new-web/utils/BMYAPIUserQueryRequest';

export default Ember.Route.extend({
	model: function(params) {
		var user_req;

		if(params.user_id !== localStorage.userid)
			user_req = new BMYAPIUserQueryRequest({ "queryid": params.user_id });
		else
			user_req = new BMYAPIUserQueryRequest();

		return user_req.pull().then(function(data) {
			return data;
		});
	}
});
