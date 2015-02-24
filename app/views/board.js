import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		Ember.$('[data-toggle="tooltip"]').tooltip();
	}
});
