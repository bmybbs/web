import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, option){
	var out = "";
	for(var i=0; i<4; i++) {
		if(value[i] == null)
			break;
		out += "&nbsp;<a href='#'>" + value[i] + "</a>";
	}

	return new Ember.Handlebars.SafeString(out);
});
