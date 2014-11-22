import BMYAPIRequest from 'BMYAPIRequest';

export default BMYAPIRequest.extend({
	init: function(obj) {
		this.url = 'api/board/info?bname='+obj.name;

		if(typeof(obj.async) !== "undefined") {
			this.async = obj.async;
		}
	}
});
