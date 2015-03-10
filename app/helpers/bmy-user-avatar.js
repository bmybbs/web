import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(userid, size, option) {
	var avatar_url = 'images/avatars/';
	var img_size = 0;
	if(typeof(userid) === "undefined" || userid.length === 0 || typeof(size) === "undefined" || size.length === 0)
		return new Ember.Handlebars.SafeString("<img src='images/avatars/48/mystery.png' alt='神秘用户'>");

	switch(size.toLowerCase()) {
	case 'xxxs': avatar_url += '48/'; img_size = '24'; break;
	case 'xxs': avatar_url += '48/'; img_size = '36'; break;
	case 'xs': avatar_url += '48/'; break;
	case 's': avatar_url += '96/'; break;
	case 'm': avatar_url += '128/'; break;
	case 'l': avatar_url += '256/'; break;
	case 'xl': avatar_url += '512/'; break;
	default: avatar_url += '48/';
	}

	if(userid === "Anonymous")
		return new Ember.Handlebars.SafeString("<img src='" + avatar_url + "mystery.png' alt='神秘用户'>");

	return new Ember.Handlebars.SafeString("<img src='" + avatar_url + userid[0].toLowerCase() + ".png' alter='" + userid + "'" + ((img_size !== 0) ? ("height='" + img_size + "' width='" + img_size + "'") : "" ) +">");
});
