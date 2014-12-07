import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';
import Ember from 'ember';

export default BMYAPIRequest.extend({
	init: function(obj) {
		if(typeof(obj.queryid) !== "undefined")
			this.url = ENV.endpoint + 'api/user/query?queryid='+obj.queryid;
		else
			this.url = ENV.endpoint + 'api/user/query?';

		if(typeof(obj.async) !== "undefined") {
			this.async = obj.async;
		}
	}/*,
	pull: function() {
		if(typeof(localStorage.userid) === "undefined")
			return Ember.RSVP.hash(
				{ 'errcode': 1000 }
			);
		else
			this._super();
	}*/
});
