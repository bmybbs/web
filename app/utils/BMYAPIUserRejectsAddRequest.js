import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		this.url = ENV.endpoint + 'api/user/rejects/add?queryid=' + obj.queryid + '&explain=' + obj.explain;

		if(typeof(obj.async) !== "undefined")
			this.async = obj.async;
	}
});
