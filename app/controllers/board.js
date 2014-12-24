import Ember from 'ember';

export default Ember.ObjectController.extend({
	queryParams: ['page', 'readtype'],
	page: 1,
	readtype: null,
	pageInput: null,

	actions: {
		prev_page: function() {
			var total_page = this.get('model.pages');

			if(this.page > total_page) {
				this.set('page', total_page);
				return ;
			}

			if(this.page > 1)
				this.set('page', this.page - 1);
		},
		next_page: function() {
			var total_page = this.get('model.pages');

			if(this.page >= total_page)
				return ;
			else if(this.page < 1)
				this.set('page', 1);
			else
				this.set('page', this.page + 1);
		},
		jump_page: function() {
			var i_pageInput = parseInt(this.pageInput);

			if(i_pageInput !== i_pageInput) {
				alert('请输入合法的数值');
				return ;
			}

			var total_page = this.get('model.pages');

			if(i_pageInput < 1 || i_pageInput > total_page) {
				alert('超出版面范围');
				return ;
			}

			this.set('pageInput', null);
			this.set('page', i_pageInput);
		}
	}
});
