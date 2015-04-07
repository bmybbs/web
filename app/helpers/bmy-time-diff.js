import Ember from 'ember';
/*global moment */

export function BMYTimeDiff(date) {
	moment.locale('zh-cn');
	var t = moment(date * 1000);
	return t.fromNow();
}

export default Ember.Handlebars.makeBoundHelper(BMYTimeDiff);
