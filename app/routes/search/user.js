import Ember from 'ember';
import BMYAPIUserAutocompleteRequest from '../../utils/BMYAPIUserAutocompleteRequest';

export default Ember.Route.extend({
	model: function(params) {
		var uac_req = new BMYAPIUserAutocompleteRequest({ 'search_str': params.search_string });

		return uac_req.pull().then(function(data) {
			data.search_string = params.search_string;
			return data;
		});
	}
});
