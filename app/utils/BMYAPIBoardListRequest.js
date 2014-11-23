import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		this.url = ENV.endpoint + 'api/board/list?secstr='+obj.secstr;

		// TODO: 排序参数

		if(typeof(obj.async) !== "undefined") {
			this.async = obj.async;
		}
	}
});
