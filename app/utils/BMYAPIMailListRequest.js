import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		this.url = ENV.endpoint + 'api/mail/list?';

		if(typeof(obj.startnum) !== "undefined") {
			this.url += "startnum=" + obj.startnum;
		}

		if(typeof(obj.count) !== "undefined") {
			this.url += "&count=" + obj.count;
		}

		if(typeof(obj.async) !== "undefined") {
			this.async = obj.async;
		}
	}
});
