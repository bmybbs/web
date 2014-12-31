import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		reply: function() {
			this.sendAction('reply');
		}
	}
});
