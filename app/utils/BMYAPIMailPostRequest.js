import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		if(typeof(obj.posttype === "undefined") || (obj.posttype !== "Reply"))
			this.url = ENV.endpoint + 'apl/mail/post?to_userid' + obj.to_userid + '&title=' + obj.title + '&backup=' + obj.backup;
		else
			this.url = ENV.endpoint + 'apl/mail/reply?to_userid' + obj.to_userid + '&title=' + obj.title + '&backup=' + obj.backup;

		this.postData = 'content=' + encodeURIComponent(obj.content);

		if(typeof(obj.async) !== "undefined")
			this.async = obj.async;
	}
});
