import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		this.url = ENV.endpoint + 'api/user/rejects/del?queryid=' + obj.queryid;

		if(typeof(obj.async) !== "undefined")
			this.async = obj.async;
	}
});
