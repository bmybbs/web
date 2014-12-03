import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, option) {
	var name = (typeof(value.name)==="undefined") ? value.board : value.name;	// 为 article_list 接口准备
	var link = "<a href='#/section/" + value.secstr + "/" + name + "'>" + name + "</a>";
	return new Ember.Handlebars.SafeString(link);
});
