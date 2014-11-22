import Class from 'class-extender';
import Ember from 'ember';
import config from './config/environment';

export default Class.extend({
	async: true,
	postData: "",
	init: function(url) {
		this.url = url;
	},
	varify: function(type) {
		this.url = this.url + "&appkey=" + config.appkey;
		if(typeof(localStorage.userid) !== "undefined")
			this.url = this.url + "&userid=" + localStorage.userid;
		if(typeof(localStorage.sessid) !== "undefined")
			this.url = this.url + "&sessid=" + localStorage.sessid;
		if(typeof(type) !== "undefined" && type === "POST" && typeof(localStorage.token) !== "undefined")
			this.url = this.url + "&token=" + localStorage.token;
	},
	pull: function() {
		this.varify();
		return Ember.$.ajax(this.url, {
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
		return Ember.$.ajax(this.url, {
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
});
