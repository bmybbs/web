import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		reply: function() {
			var params = this.get('model.params');
			this.transitionTo('article-reply', params.section_id, params.board_id, params.article_id);
		}
	}
});
