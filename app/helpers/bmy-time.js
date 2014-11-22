import Ember from 'ember';
/*global moment */

export function BMYTime(date, format) {
	var t = new moment.unix(date);
	return (typeof(format) === "undefined") ? t.format('YYYY.MM.DD HH:mm') : t.format(format);
}

export default Ember.Handlebars.makeBoundHelper(BMYTime);
