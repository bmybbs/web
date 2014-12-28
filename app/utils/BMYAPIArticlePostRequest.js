import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		if(typeof(obj.posttype) === "undefined" || (obj.posttype==="NewPost")) {
			this.url = ENV.endpoint + 'api/article/post?board=' + obj.board + '&title=' + obj.title;
		} else if(obj.posttype === "Reply") {
			this.url = ENV.endpoint + 'api/article/reply?board=' + obj.board + '&title=' + obj.title + '&ref=' + obj.ref + '&rid=' + obj.rid + '&th=' + obj.thread;
		}

		this.postData = "content=" + encodeURIComponent(obj.content);

		if(typeof(obj.async) !== "undefined")
			this.async = obj.async;
	}
});
