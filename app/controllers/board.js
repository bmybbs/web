import Ember from 'ember';

export default Ember.ObjectController.extend({
	queryParams: ['page', 'readtype'],
	page: null,
	readtype: null
});
