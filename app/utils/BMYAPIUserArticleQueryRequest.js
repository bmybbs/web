import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		this.url = ENV.endpoint + 'api/user/articlequery?query_user=' + ((typeof(obj.query_user) !== "undefined") ? obj.query_user : localStorage.userid) + '&query_day=' + ((typeof(obj.query_day) !== "undefined") ? obj.query_day : 1);

		if(typeof(obj.async) !== "undefined") {
			this.async = obj.async;
		}
	}
});
