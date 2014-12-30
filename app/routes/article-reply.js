import Ember from 'ember';
import BMYAPIBoardRequest from 'bmy-new-web/utils/BMYAPIBoardRequest';
import BMYAPIArticleRequest from 'bmy-new-web/utils/BMYAPIArticleRequest';
import get_bmysec_name from 'bmy-new-web/utils/BMYGetSecName';

export default Ember.Route.extend({
	model: function(params) {
		var board_req = new BMYAPIBoardRequest({ "name": params.board_id });
		var article_req = new BMYAPIArticleRequest({ "aid": params.article_id, "board": params.board_id, "type": "RAW" });

		return Ember.RSVP.hash({
			header: board_req.pull().then(function(data) {
				return data;
			}),
			article: article_req.pull().then(function(data) {
				if(data.errcode === 0) {
					var a = {
						"can_reply": 1,
						"board": params.board_id,
						"author": localStorage.userid,
						"thread": data.thread,
						"num": 0,
						"content": '\n【 在 ' + data.author + ' 的大作中提到: 】\n: '+ data.content.replace(/\n/g, '\n: '),
						"title": (data.title.substr(0, 4) === 'Re: ') ? (data.title) : ('Re: '+data.title),
						"ref": params.article_id,
						"rid": data.num,
						"posttype": "Reply"
					};

					return a;
				}
			}),
			params: params
		});
	},
	setupController: function(controller, model) {
		this._super(controller, model);

		controller.set('secname', get_bmysec_name(model.header.secstr));
		controller.set('hasSmallBM', model.header.bm[4]);
	},
	renderTemplate: function() {
		this.render('article-edit');
	}
});
