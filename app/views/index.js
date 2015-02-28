import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		Ember.$('div#bmy-navbar').addClass('hidden');
	}
});
