import BMYAPIRequest from './BMYAPIRequest';

export default BMYAPIRequest.extend({
	init: function(obj) {
		if((typeof(obj.type) !== "undefined") && (obj.type==="RAW"))
			this.url = 'api/article/getRAWContent';
		else
			this.url = 'api/article/getHTMLContent';

		// 初始化参数
		this.url += "?aid="+obj.aid.toString()+"&board="+obj.board;

		if(typeof(obj.async) !== "undefined")
			this.async = obj.async;
	}
});
