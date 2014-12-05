import Ember from 'ember';

var $ = Ember.$;

Ember.TextField.reopen({
	keyUp: function(event) {
		this.sendAction('key-up', this, event);
	}
});

export default Ember.ObjectController.extend({
	searchcommand: '',
	actions: {
		commandbarFocusInInput: function() {
			if($('#commandbar input').val().length > 0)
				$('#commandbar').addClass('open');
		},
		commandbarFocusOutInput: function() {
			$('#commandbar').removeClass('open');
		},
		commandbarKeyUp: function() {
			if($('#commandbar input').val().length > 0)
				$('#commandbar').addClass('open');
			else
				$('#commandbar').removeClass('open');
		}
	}
});
