import Ember from 'ember';
import BMYAPINotificationDelRequest from '../utils/BMYAPINotificationDelRequest';

export default Ember.ObjectController.extend({
	actions: {
		delAll: function() {
			var self = this,
				ndr = new BMYAPINotificationDelRequest({ "type": "delall" });

			ndr.pull().then(function(data) {
				self.set('model', { });
			});
		},
		delItem: function(board, aid, nid) {
			var ndr = new BMYAPINotificationDelRequest({ "board": board, "aid": aid });

			ndr.pull().then(function(data) {
				Ember.$('div.notify-item#' + nid).remove();
			});
		}
	}
});
