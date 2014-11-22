import BMYAPIRequest from 'BMYAPIRequest';

export default BMYAPIRequest.extend({
	init: function(obj) {
		this.url = 'api/board/list?secstr='+obj.secstr;

		// TODO: 排序参数

		if(typeof(obj.async) !== "undefined") {
			this.async = obj.async;
		}
	}
});
