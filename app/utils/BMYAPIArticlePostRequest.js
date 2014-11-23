import BMYAPIRequest from './BMYAPIRequest';

export default BMYAPIRequest.extend({
	init: function(obj) {
		if(typeof(obj.type) === "undefined" || (obj.type==="NewPost")) {
			this.url = 'api/article/post?board=' + obj.board + '&title=' + obj.title;
		} else if(obj.type === "Reply") {
			this.url = 'api/article/reply?board=' + obj.board + '&title=' + obj.title + '&ref=' + obj.ref + '&rid=' + obj.rid + '&th=' + obj.thread;
		}

		this.postData = "content=" + encodeURIComponent(obj.content);

		if(typeof(obj.async) !== "undefined")
			this.async = obj.async;
	}
});
