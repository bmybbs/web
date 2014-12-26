import Ember from 'ember';
import ENV from 'bmy-new-web/config/environment';

export default function get_bmysec_name(sec_id) {
	return Ember.$.grep(ENV.bmysecstrs, function(e) {
		return e.id === sec_id;
	})[0].name;
}
