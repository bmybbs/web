import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		if((typeof(obj.type) !== "undefined") && (obj.type==="RAW"))
			this.url = ENV.endpoint + 'api/article/getRAWContent';
		else
			this.url = ENV.endpoint + 'api/article/getHTMLContent';

		// 初始化参数
		this.url += "?aid="+obj.aid.toString()+"&board="+obj.board;

		if(typeof(obj.async) !== "undefined")
			this.async = obj.async;
	}
});
