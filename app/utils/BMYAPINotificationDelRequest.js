import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		this.url = ENV.endpoint + 'api/notification/del?';

		if (typeof(obj.type) !== "undefined" && obj.type === "delall") {
			this.url += "type=delall";
		} else if (typeof(obj.board) !== "undefined" && typeof(obj.aid) !== "undefined") {
			this.url += "board=" + obj.board + "&aid=" + obj.aid;
		}
	}
});
