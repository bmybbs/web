import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		post_redirect: function() {
			var params = this.get('model.params');
			this.transitionTo('board', params.section_id, params.board_id);
		}
	}
});
