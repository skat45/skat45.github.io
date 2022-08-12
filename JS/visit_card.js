let hue = 0;
let str = '';
let cursor = false;

$(document).ready(function() {
	setTimeout(function() {
		show_hi();
	}, 500);

	setInterval(function() {
		age();
	}, 1);

	$(document).keyup(function(e) {

		let symb = e.key;
		if ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.includes(symb) && str.length < 20) {
			symb = symb.toLowerCase();
			str += symb;
		}

		if (symb == 'Backspace' && str.length > 0) {
			str = str.slice(0, -1)
		}

		if (symb == 'Enter') {
			alert('ent');
		}

		if (cursor) {
			$('#str').html(str + '|');
		}
		else {
			$('#str').html(str);
		}
	});

	setInterval(function() {
		if (cursor) {
			cursor = false;
			$('#str').html(str + '|');
		}
		else {
			cursor = true;
			$('#str').html(str);
		}
	}, 500);
});

function show_hi() {
	$('#hi').css('display', '');
	setTimeout(function() {
		show_about_label();
	}, 1200);
}

function show_about_label() {
	$('#about_label').css('display', '');
	setTimeout(function() {
		show_about();
	}, 1200);
}

function show_about() {
	$('#about').css('display', '');
	$('#inp').focus();
}


function age() {
	hue += 0.7;
	if (hue > 360) hue = 0;
	$('#age').css('color', 'hsl(' + hue + ', 50%, 30%)');
	let birth = new Date(2003, 10, 10, 12, 0, 0, 0); // 10.11.2003
	let now = new Date();
	let age_now = now.getTime() - birth.getTime();
	$('#age').html(age_now);
}