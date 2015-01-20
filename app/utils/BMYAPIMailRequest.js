import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		if((typeof(obj.type) !== "undefined") && (obj.type === "RAW"))
			this.url = ENV.endpoint + 'api/mail/getRAWContent';
		else
			this.url = ENV.endpoint + 'api/mail/getHTMLContent';

		this.url += '?num=' + obj.num;
	}
});
