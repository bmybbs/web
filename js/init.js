$(document).ready(function() {

	// setup commandbar
	$('#commandbar').on('show.bs.dropdown', function() {
		return false;
	});
	$('#commandbar input').keyup(function () {
		if($('#commandbar input').val().length == 0)
			$('#commandbar').removeClass('open');
		else
			$('#commandbar').addClass('open');
	});
	$('#commandbar input').blur(function() {
		$('#commandbar').removeClass('open');
	});
	$('#commandbar input').focus(function () {
		if($('#commandbar input').val().length > 0)
			$('#commandbar').addClass('open');
	});

	// load personal status
	load_personal_status(function() {
		$('#login-button').bind('click', function(e) {
			e.preventDefault();
			popup = $('#login-box').bPopup({
				modalClose: false,
				opacity: 0.6,
				positionStyle: 'fixed'
			});
		});

		bind_logout_button(function() {
			document.location.href = 'index.html';
		});

		bind_login_button(function() {
			popup.close();
		});
	});
	setInterval(load_personal_status, 30000);
});
