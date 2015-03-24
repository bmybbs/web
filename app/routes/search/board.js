import Ember from 'ember';
import BMYAPIBoardAutocompleteRequest from '../../utils/BMYAPIBoardAutocompleteRequest';

export default Ember.Route.extend({
	model: function(params) {
		var bac_req = new BMYAPIBoardAutocompleteRequest({ 'search_str': params.search_string });

		return bac_req.pull().then(function(data) {
			data.search_string = params.search_string;
			return data;
		});
	}
});
