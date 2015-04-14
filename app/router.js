import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('index', { path: '/' });
	this.resource('dashboard');
	this.route('section', { path: '/section/:section_id' });
	this.route('board', { path: '/section/:section_id/:board_id' }, function() {
		this.route('index', { path: '/' });
		this.route('thread', { path: '/:thread_id' });
	});

	this.route('article', { path: '/section/:section_id/:board_id/article/:article_id' });
	this.route('article-reply', { path: '/section/:section_id/:board_id/:article_id/reply' });
	this.route('article-edit', { path: '/section/:section_id/:board_id/:article_id/edit' });
	this.route('article-new', { path: '/section/:section_id/:board_id/new' });

	this.resource('favourite', { path: '/favourite' });

	this.route('mails', { path: '/mail' }, function() {
		this.route('mail', { path: '/:mail_id' });
	});

	this.route('user', { path: '/user/:user_id'});

	this.route('settings', { path: '/settings' }, function() {
		this.route('friends');
		this.route('rejects');
		this.route('favourite');
	});

	this.route('notifications');

	this.route('search', { path: '/search' }, function() {
		this.route('user', { path: '/user/:search_string' });
		this.route('board', { path: '/board/:search_string' });
	});
});

export default Router;
