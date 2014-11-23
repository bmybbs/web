import BMYAPIRequest from './BMYAPIRequest';
import ENV from 'bmy-new-web/config/environment';

export default BMYAPIRequest.extend({
	init: function(obj) {
		var baseURL = ENV.endpoint + 'api/article/list?type=';

		if(typeof(obj.type) !== "undefined") {
			this.url = baseURL + obj.type;
			switch (obj.type) {
				case "top10":
					break;

				case "sectop":
					if(typeof(obj.secstr) !== "undefined")               // warning
						this.url = this.url + "&secstr=" + obj.secstr;
					break;

				case "commend":
					if(typeof(obj.count) !== "undefined")
						this.url = this.url + "&count=" + obj.count;
					if(typeof(obj.startnum) !== "undefined")
						this.url = this.url + "&startnum=" + obj.startnum;
					break;

				case "announce":
					if(typeof(obj.count) !== "undefined")
						this.url = this.url + "&count=" + obj.count;
					if(typeof(obj.startnum) !== "undefined")
						this.url = this.url + "&startnum=" + obj.startnum;
					break;

				case "board":
					this.url = this.url + "&board=" + obj.board + "&btype=" + obj.btype;
					if(typeof(obj.count) !== "undefined")
						this.url = this.url + "&count=" + obj.count;
					if(typeof(obj.startnum) !== "undefined")
						this.url = this.url + "&startnum=" + obj.startnum;
					if(typeof(obj.page) !== "undefined")
						this.url = this.url + "&page=" + obj.page;
					break;

				case "thread":
					this.url = this.url + "&board=" + obj.board + "&thread=" + obj.thread;
					if(typeof(obj.count) !== "undefined")
						this.url = this.url + "&count=" + obj.count;
					if(typeof(obj.startnum) !== "undefined")
						this.url = this.url + "&startnum=" + obj.startnum;
					break;

				case "boardtop":
					this.url = this.url + "&board=" + obj.board;
					break;
			}
		}

		if(typeof(obj.async) !== "undefined") {
			this.async = obj.async;
		}
	}
});
