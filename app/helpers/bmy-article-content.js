import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, option){
	return new Ember.Handlebars.SafeString(value);
});
