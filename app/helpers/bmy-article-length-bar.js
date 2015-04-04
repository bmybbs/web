import Ember from 'ember';
/*global moment */

var CLR_RED = '#CC0000',
	CLR_GREEN = '#00FF00',
	CLR_PINK = '#FF00FF',
	CLR_BLUE = '#3300FF',
	CLR_YELLOW = '#FFFF00',
	CLR_PP = '#CC00FF',
	CLR_BLACK = '#000000';

export default Ember.Handlebars.makeBoundHelper(function(aid, length) {
	var t = moment(aid * 1000),
		day_of_week = t.day(),
		bar_color, percent;

	switch(day_of_week) {
	case 0: bar_color = CLR_BLACK; break;
	case 1: bar_color = CLR_RED; break;
	case 2: bar_color = CLR_GREEN; break;
	case 3: bar_color = CLR_PINK; break;
	case 4: bar_color = CLR_BLUE; break;
	case 5: bar_color = CLR_YELLOW; break;
	case 6: bar_color = CLR_PP; break;
	}

	if(length < 128)
		percent = 10;
	else if(length >= 128 && length < 256)
		percent = 25;
	else if(length >= 256 && length < 512)
		percent = 50;
	else if(length >= 512 && length < 1024)
		percent = 75;
	else
		percent = 100;

	var bar = "<div class='progress'><div class='progress-bar' style='width: " + percent + "%; background: " + bar_color + "'></div></div>";
	return new Ember.Handlebars.SafeString(bar);
});
