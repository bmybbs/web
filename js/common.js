// common variables
var popup;

function get_bmysec_name(sec_id) {
	return $.grep(bmysecstrs, function(e) {
		return e.id == sec_id;
	})[0].name;
}
