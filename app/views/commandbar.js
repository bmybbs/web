import Ember from 'ember';

var $ = Ember.$;

export default Ember.View.extend({
	tagName: 'div',
	click: function() {
		if($('#commandbar').hasClass('open')) {
			$('#commandbar').removeClass('open');
		} else if($('#commandbar input').val().length > 0) {
			$('#commandbar').addClass('open');
		}
	},
	focusIn: function() {
		if($('#commandbar input').val().length > 0)
			$('#commandbar').addClass('open');
	},
	focusOut: function() {
		$('#commandbar').removeClass('open');
	}
});
