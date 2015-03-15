import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(string, keyword) {
	var re = new RegExp( '(' + keyword + ')', "gi");
	return new Ember.Handlebars.SafeString(string.replace(re, "<strong>$1</strong>"));
});
