import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, option){
	var out = "";
	for(var i=4; i<value.length; i++) {
		if(value[i] == null)
			break;
		out += "&nbsp;<a href='#'>" + value[i] + "</a>";
	}

	return new Handlebars.SafeString(out);
});
