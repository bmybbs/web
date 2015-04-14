import Ember from 'ember';
import BMYAPIArticleListRequest from 'bmy-new-web/utils/BMYAPIArticleListRequest';
import BMYAPIArticleRequest from 'bmy-new-web/utils/BMYAPIArticleRequest';

export default Ember.Route.extend({
	model: function(params) {
		var parentParams = this.modelFor('board').params;

		var al = new BMYAPIArticleListRequest({
			"type": "thread",
			"board": parentParams.board_id,
			"thread": params.thread_id
		});

		return Ember.RSVP.hash({
			params: params,
			articlelist: al.pull().then(function(data) {
				if(data.errcode === 0) {
					return data.articlelist;
				}
			})
		});
	},
	setupController: function(controller, model) {
		this._super(controller, model);
		controller.set('th_title', model.articlelist[0].title);

		var articles = [ ];
		var count = 0;
		var total = model.articlelist.length;

		model.articlelist.forEach(function(element, index, array) {
			var article_req = new BMYAPIArticleRequest({
				"aid": element.aid,
				"board": element.board
			});

			article_req.pull().then(function(article) {
				if(article.errcode === 0) {
					article.aid = element.aid;
					articles.push(article);
					count++;

					if(count === total) {
						controller.set('articles', articles);
					}
				}
			});
		});
	}
});
