import Ember from 'ember';
import ENV from 'bmy-new-web/config/environment';

/*global Class */

var a = Class.extend({
	async: true,
	postData: "",
	internal_url: ""
});

a.prototype = {
	init: function(url) {
		this.url = url;
	},
	varify: function(type) {
		this.internal_url = this.url + "&appkey=" + ENV.appkey;
		if(typeof(localStorage.userid) !== "undefined")
			this.internal_url = this.internal_url + "&userid=" + localStorage.userid;
		if(typeof(localStorage.sessid) !== "undefined")
			this.internal_url = this.internal_url + "&sessid=" + localStorage.sessid;
		if(typeof(type) !== "undefined" && type === "POST" && typeof(localStorage.token) !== "undefined")
			this.internal_url = this.internal_url + "&token=" + localStorage.token;
	},
	pull: function() {
		this.varify();
		return Ember.$.ajax(this.internal_url, {
			type: "GET",
			dataType: 'json',
			async: this.async,
			success: function(data) {
				return data;
			}
		}).then(function(data) {
				return data;
		});
	},
	post: function() {
		this.varify("POST");
		return Ember.$.ajax(this.internal_url, {
			type: "POST",
			dataType: 'json',
			data: this.postData,
			async: this.async,
			success: function(data) {
				if(data.errcode === 0) {
					localStorage.token = data.token;
					return data;
				}
			}
		}).then(function(data) {
			return data;
		});
	}
};

export default a;
