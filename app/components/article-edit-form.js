import Ember from 'ember';
import BMYAPIArticlePostRequest from 'bmy-new-web/utils/BMYAPIArticlePostRequest';

export default Ember.Component.extend({
	actions: {
		doneEditing: function() {
			var article = this.get('article');
			var req = new BMYAPIArticlePostRequest(article);

			var that = this;
			req.post().then(function(data) {
				if(data.errcode === 0) {
					that.sendAction('redirect');
				} else {
					alert('服务器开小差了，请稍后再试...');
					console.log(data.errcode);
				}
			});
		}
	}
});
