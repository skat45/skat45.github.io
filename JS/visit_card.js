let hue = 0;

$(document).ready(function() {
	setInterval(function() {
		age();
	}, 1);
});


function age() {
	hue += 0.7;
	if (hue > 360) hue = 0;
	$('#age').css('color', 'hsl(' + hue + ', 50%, 30%)');
	let birth = new Date(2003, 10, 10, 12, 0, 0, 0); // 10.11.2003
	let now = new Date();
	let age_now = now.getTime() - birth.getTime();
	$('#age').html(age_now);
}