import Ember from 'ember';
/*global moment */

export function BMYTime(date) {
	var t = moment(date * 1000);
	return t.format('YYYY.MM.DD HH:mm');
}

export default Ember.Handlebars.makeBoundHelper(BMYTime);
