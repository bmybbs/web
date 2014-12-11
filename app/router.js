import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('index', { path: '/' });
	this.resource('dashboard');
	this.route('section', { path: '/section/:section_id' }, function() {
		this.route('board', { path: '/:board_id' }, function() {
			this.route('article', { path: '/:article_id' }, function() {
				this.route('reply');
				this.route('edit');
			});
			this.route('new');
		});
	});
	this.resource('fav', { path: '/fav' });
});

export default Router;
