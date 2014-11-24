import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('index', { path: '/' });
	this.resource('dashboard');
	this.resource('section', { path: '/section/:sec_id' });
	this.resource('fav', { path: '/fav' });

	this.resource('board', { path: '/section/:sec_id/:board_name' });
	this.resource('boardThread', { path: '/section/:sec_id/:board_name/thread' });
	this.resource('boardPage', { path: '/section/:sec_id/:board_name/page/:page_num'});

	this.resource('articleRead', { path: '/section/:sec_id/:board_name/:aid' });
	this.resource('articlePost', { path: '/section/:sec_id/:board_name/new' });
	this.resource('articleReply', { path: '/section/:sec_id/:board_name/:aid/reply' });

	this.resource('articleThread', { path: '/section/:sec_id/:board_name/thread/:tid' });
});

export default Router;
