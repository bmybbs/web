import Ember from 'ember';
import BMYAPIMailListRequest from 'bmy-new-web/utils/BMYAPIMailListRequest';

export default Ember.Route.extend({
	queryParams: {
		box_type: { refreshModel: true }
	},
	model: function(params) {
		var mail_list_req;
		if(typeof(params.box_type) !== "undefined" && params.box_type === "sent")
			mail_list_req = new BMYAPIMailListRequest({ box_type:1 });
		else
			mail_list_req = new BMYAPIMailListRequest({ });

		return mail_list_req.pull().then(function(data) {
			return data;
		});
	}
});
