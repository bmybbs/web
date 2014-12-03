import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, option) {
	var link = "<a href='#/section/" + value.secstr + "/" + value.board + "/" + value.aid + "'>" + value.title + "</a>";
	return new Ember.Handlebars.SafeString(link);
});
