let icons = {'MSDOS': 'MS-DOSICON.png', 'POPIT': 'POPITICON.png', 'CALC': 'CALCICON.png', 'SKAT45': 'SCAT45ICO.png', 'CLOCK': 'ClockFace.png', 'NOTEPAD': 'NOTEPADICO.png'};
let options_panel = {'MSDOS': {'File': ['Exit', 'About MS-DOS Exec...'], 'Special': ['End session']}, 'POPIT': {'File': ['About PopIt']}, 'CALC': {'Edit': ['Exit', 'About Calculator']}, 'SKAT45': {'VK': '', 'GitHub': '', 'Instagram': ''}, 'CLOCK': [], 'NOTEPAD': {'File': ['New', 'Save', 'Save As...', false, 'Exit', 'About Notepad...'], 'Edit': ['Select all']}};

// Ключ - название str, 0 - расширение str, 1 - вес int, 2 - дата создания array [[d int, m int, y int], [h int, m int]]
// Программа: 3 - возможность полноэкранного использования bool
// Файл: 3 - содержимое
let about_text = 'About me:\n\nI live in Russia X_X\n\nMy instruments:\n❖ HTML, SCC, JS\n❖ jQuery, jQuery (cookie)\n❖ Bootstrap\n❖ Python, Flask, Flask_SQLalchemy\n❖ C++ (Arduino IDE)\n\nThis is my 1st big project.\nOther projects you can finde here:\n\ngithub.com/skat45';
let all_apps_and_fles = {'ABC': ['TXT', 42, [[8, 14, 87], [10, 56]], 'This is the contents of the file ABC.TXT'], 'About': ['TXT', 18650, [[14, 8, 2021], [13, 22]], about_text], 'CALC': ['EXE', 2800, [[11, 12, 87], [13, 21]], false], 'CLOCK': ['EXE', 5, [[11, 12, 87], [13, 21]], true], 'MSDOS': ['EXE', 1, [[10, 30, 87], [18, 12]], true], 'NOTEPAD': ['EXE', 198336, [[11, 12, 1987], [11, 20]], true],'POPIT':['EXE', 0.5, [[6, 6, 2022], [20, 43]], false], 'SKAT45': ['EXE', 2281337, [[10, 11, 2003], [12, 20]], false], 'UNICODE': ['TXT', 56, [[6, 9, 2021], [7, 59]], 'I ▯ unicode']};

function start_program(name, param) {
	$('body').append('<div id="creating_win"></div>');
	let win = $('#creating_win');
	win.attr('id', '');
	win.attr('program', name);
	win.attr('image', icons[name]);
	win.attr('roll', all_apps_and_fles[name][3]);
	win.attr('rolled', 'f');
	win.css('z-index', max_zet_index);
	max_zet_index += 1;
	let all_win = $('.ActiveWindow');
	all_win.removeClass('ActiveWindow');
	all_win.addClass('NotActiveWindow');
	win.addClass('ActiveWindow');
	win.addClass('Win');
	win.append('<div class="Window"></div>');
	win.append('<div class="WindowsBorders"><div class="BorderTop"></div><div class="BorderLeft"></div><div class="BorderRight"></div><div class="BorderBottom"></div></div>');
	switch (name) {
		case 'CALC':
			win.css('width', '400px');
			win.css('height', '300px');
			break;

		case 'CLOCK':
			win.css('width', '300px');
			win.css('height', '300px');
			break;

		case 'MSDOS':
			win.css('width', '550px');
			win.css('height', '400px');
			break;
		case 'SKAT45':
			win.css('width', '700px');
			win.css('height', '350px');
			break;

		case 'NOTEPAD':
			win.css('width', '500px');
			win.css('height', '650px');
			break;

		case 'POPIT':
			win.css('width', '400px');
			win.css('height', '450px');
			break;
	}

	if (last_window_position['x'] < $(window).width() - win.width()) last_window_position['x'] += 20;
	else last_window_position['x'] = 10;
	if (last_window_position['y'] < $(window).height() - win.height()) last_window_position['y'] += 20;
	else last_window_position['y'] = 10;
	
	win.css('left', last_window_position['x']);
	win.css('top', last_window_position['y']);
	last_window_position['y'] += 20;

	win = win.children('.Window');
	let control_panel = '<div class="ControlPanel"><img class="FuctionBTN" src="FuctionBTN.png"><div class="movePlace"><span>' + name + '</span></div><div class="WindowMoveBTNs"><img class="RollDownBTN" src="RollDownBTN.png">';
	if (all_apps_and_fles[name][3]) control_panel += '<img class="Max MaxMin" src="RollUpBTN.png">';
	else control_panel += '<div class="Max MaxMin"></div>';
	control_panel += '</div></div>';
	win.append(control_panel);
	if (Object.keys(options_panel[name]).length != 0) {
		win.append('<div class="OptionsPanel"></div>');
		for (let i of Object.keys(options_panel[name])) {
			win.children('.OptionsPanel').append('<div class="Option">' + i + '</div>');
		}
	}
	win.append('<div class="WindowBody"></div>');

	switch (name) {
		case 'MSDOS':
			ms_dos_content(win.children('.WindowBody'));
			break;

		case 'CALC':
			calc_content(win.children('.WindowBody'));
			$('.CalcBtn').css('height', $('.CalcBtn').css('width'));
			break;

		case 'CLOCK':
			clock_content(win.children('.WindowBody'));
			break;

		case 'SKAT45':
			skat45_content(win.children('.WindowBody'));
			break;

		case 'NOTEPAD':
			NOTEPAD_content(win.children('.WindowBody'), param);
			break;

		case 'POPIT':
			popit_content(win.children('.WindowBody'));
			break;
	}

	win = win.parents('.Win');
	let borders_div = win.children('.WindowsBorders');
	borders_div.children('.BorderTop, .BorderBottom').css('width', win.css('width'));
	borders_div.children('.BorderTop').css('top', '-2.5px');

	borders_div.children('.BorderLeft, .BorderRight').css('height', 'calc(' + win.css('height') + ' + 10px)');
	borders_div.children('.BorderLeft, .BorderRight').css('top', '-2.5px');
	borders_div.children('.BorderLeft').css('left', '-5px');

	borders_div.children('.BorderRight').css('left', win.css('width'));

	jquery_links();
}

function ms_dos_content(win) {
	win.parents('.Window').children('.ControlPanel').children('.movePlace').children('span').text('MS-DOS Executive');
	win.append('<div style="display: flex;"><div class="DiskAICON"><div>A</div><img src="DiskAICON.png"></div><div class="Path">A: WIN2 03 \\</div></div>');
	win.append('<ul class="FileList"></ul>');
	update_apps_list();
}

function calc_content(win) {
	win.parents('.Window').children('.ControlPanel').children('.movePlace').children('span').text('Calculator');
	win.css('background-image', 'url("CalcBackground.png")');
	win.append('<div class="CalcResultPlace"><div>');
	win.children('.CalcResultPlace').append('<div class="CalcMIndicator"></div>');
	win.children('.CalcResultPlace').append('<div class="CalcResult" operation="" operationnow="" operationdone="t" temp="0" equalstemp="" m="0">0.</div>');
	win.append('<table class="CalcBtnsTable"></table>');
	let buttons_array = [['MC', '7', '8', '9', '/', '√'], ['MR', '4', '5', '6', '*', '%'], ['M+', '1', '2', '3', '-', 'C'], ['M-', '0', '.', '±', '+', '=']];
	for (let i = 0; i < buttons_array.length; i++) {
		let tr = '<tr>';
		for (let j = 0; j < buttons_array[i].length; j++) {
			tr += '<td><div class="CalcBtn" symb="' + buttons_array[i][j] + '">' + buttons_array[i][j] + '</div></td>';
		}
		tr += '</tr>';
		win.children('.CalcBtnsTable').append(tr);
	}
	$('.CalcBtn').off('click');
	$('.CalcBtn').click(function() {calc_btn_click(this);});
}

function calc_btn_click(btn) {
	let res_place = $(btn).parents('.WindowBody').children('.CalcResultPlace').children('.CalcResult');
	let res = parseFloat(res_place.text());
	let symb = $(btn).attr('symb');
	let indicator = $(btn).parents('.WindowBody').children('.CalcResultPlace').children('.CalcMIndicator');
	switch (symb) {
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '0':
			if (res_place.attr('operationnow') == 'c')  {
				res_place.attr('operationnow', '');
				res_place.text('0');
			}

			if (res < 0 && String(res).length < 10 || res >= 0 && String(res).length < 11) {
				if (res_place.text() == '0.' || res_place.text() == '0') res_place.text('');
				res_place.append(symb);
			}
			break;

		case '.':
			let tf = false;
			for (let i of '' + res_place.text()) {
				if (i == '.') tf = true;
			}
			if (!tf) {
				res_place.text(res_place.text() + symb);
			}
			break;

		case 'C':
			res_place.text('0.');
			res_place.attr('operationnow', '');
			res_place.attr('temp', '');
			res_place.attr('equalstemp', '');
			break;

		case '±':
			res_place.text(parseFloat(res_place.text()) * -1);
			break;

		case '√':
			res_place.text(parseFloat(Math.sqrt(res_place.text()).toPrecision(11)));
			if ((parseFloat(res_place.text()) * 10) % 10 == 0) {
				res_place.text(res_place.text() + '.');
			}
			if (res_place.text() == 'NaN') res_place.text('Error');
			res_place.attr('operationnow', 'c');
			calc_add_point(res_place);
			break;

		case '+':
		case '-':
		case '*':
		case '/':
		case '=':
			let operation = res_place.attr('operation');
			if (operation != '') {
				let temp = res_place.attr('temp');
				if (operation == '+') {
					if (temp != '') {
						res_place.attr('equalstemp', res_place.text());
						res_place.text(parseFloat((parseFloat(res_place.attr('temp')) + parseFloat(res_place.text())).toPrecision(11)));
						res_place.attr('operationdone', 'f');
						calc_add_point(res_place);
					}
				}
				else if (operation == '-') {
					if (temp != '') {
						res_place.attr('equalstemp', res_place.text());
						res_place.text(parseFloat((parseFloat(res_place.attr('temp')) - parseFloat(res_place.text())).toPrecision(11)));
						res_place.attr('operationdone', 'f');
						calc_add_point(res_place);
					}
				}
				else if (operation == '*') {
					if (temp != '') {
						res_place.attr('equalstemp', res_place.text());
						res_place.text(parseFloat((parseFloat(res_place.attr('temp')) * parseFloat(res_place.text())).toPrecision(11)));
						res_place.attr('operationdone', 'f');
						calc_add_point(res_place);
					}
				}
				else if (operation == '/') {
					if (temp != '') {
						res_place.attr('equalstemp', res_place.text());
						res_place.text(parseFloat((parseFloat(res_place.attr('temp')) / parseFloat(res_place.text())).toPrecision(11)));
						res_place.attr('operationdone', 'f');
						calc_add_point(res_place);
					}
				}
				res_place.attr('temp', '');
			}

			res_place.attr('operationnow', 'c');

			if (symb != '=') {
				res_place.attr('temp', res_place.text());
				res_place.attr('operation', symb);
			}
			else {
				if (res_place.attr('equalstemp') != '' && res_place.attr('operationdone') == 't') {
					if (operation == '+') res_place.text(parseFloat((parseFloat(res_place.text()) + parseFloat(res_place.attr('equalstemp'))).toPrecision(11)));
					else if (operation == '-') res_place.text(parseFloat((parseFloat(res_place.attr('equalstemp')) - parseFloat(res_place.text())).toPrecision(11)));
					else if (operation == '*') res_place.text(parseFloat((parseFloat(res_place.attr('equalstemp')) * parseFloat(res_place.text())).toPrecision(11)));
					else if (operation == '/') res_place.text(parseFloat((parseFloat(res_place.text()) / parseFloat(res_place.attr('equalstemp'))).toPrecision(11)));
					calc_add_point(res_place);
				}

				res_place.attr('operationdone', 't');
			}
			break;

			case '%':
				if (res_place.attr('temp') != '') res_place.text(parseFloat(parseFloat(res_place.attr('temp')) / 100 * parseFloat(res_place.text()).toPrecision(11)));
				calc_add_point(res_place);
				break;

			case 'MC':
				res_place.attr('m', '0');
				$(btn).parents('.WindowBody').children('.CalcResultPlace').children('.CalcMIndicator').css('display', 'none');
				res_place.attr('operationnow', 'c');
				break;

			case 'M+':
				res_place.attr('m', parseFloat(res_place.text()) + parseFloat(res_place.attr('m')));
				if (res_place.attr('m') == '0') indicator.css('display', 'none');
				else indicator.css('display', 'block');
				res_place.attr('operationnow', 'c');
				calc_add_point(res_place);
				break;

			case 'M-':
				res_place.attr('m', parseFloat(res_place.attr('m')) - parseFloat(res_place.text()));
				if (res_place.attr('m') == '0') indicator.css('display', 'none');
				else indicator.css('display', 'block');
				res_place.attr('operationnow', 'c');
				calc_add_point(res_place);
				break;

			case 'MR':
				res_place.text(parseFloat(parseFloat(res_place.attr('m')).toPrecision(11)));
				res_place.attr('operationnow', 'c');
				calc_add_point(res_place);
				break;
	}
}

function calc_add_point(res) {
	let text = res.text();
	let tf = false;
	for (let i of '' + text) {
		if (i == '.') tf = true;
	}
	if (!tf) {
		res.text(res.text() + '.');
	}

}

function clock_content(win) {
	win.append('<canvas class="HourHands"></canvas>');
	clock_change_size(win);
}

function clock_change_size(win) {
	win.children('.HourHands').attr('id', 'hour_hands');
	let w = win.width();
	let h = win.height();
	let zero_x = w / 2;
	let zero_y = h / 2;
	let size = 0;
	if (w >= h) size = h;
	else size = w;


	const canvas = win.children('canvas');
	canvas.attr('height', size);
	canvas.attr('width', size);
	canvas.css('display', 'block');
	canvas.css('margin', '0 auto');
	canvas.css('margin-top', (h - size) / 2 + 5 + 'px');

	let hands = document.getElementById("hour_hands");
	let ctx = hands.getContext('2d');
	$('#hour_hands').attr('id', '');

	update_time(canvas, ctx, size);

	$('.HourBlock').remove();
	for (let i = 0; i < 12; i++) {
		win.append('<div id="hour_block" class="HourBlock"></div>');
		let left = zero_x + (size / 2.1 * Math.cos(Math.PI / 6 * i) - 6);
		let top = zero_y + (size / 2.1 * Math.sin(Math.PI / 6 * i) + 20);
		$('#hour_block').css('left', left + 'px');
		$('#hour_block').css('top', top + 'px');
		$('#hour_block').attr('id', '');
	}

	$('.MinuteBlock').remove();
	for (let i = 0; i < 60; i++) {
		win.append('<div id="minute_block" class="MinuteBlock"></div>');
		let left = zero_x + (size / 2.1 * Math.cos(Math.PI / 30 * i));
		let top = zero_y + (size / 2.1 * Math.sin(Math.PI / 30 * i) + 25.5);
		$('#minute_block').css('left', left + 'px');
		$('#minute_block').css('top', top + 'px');
		$('#minute_block').attr('id', '');
	}
}

function update_time(canvas, ctx, size) {
	canvas.attr('height', size);
	ctx.lineWidth = 0.0022 * size;

	let now = new Date();
	let now_s = now.getSeconds();
	let now_m = now.getMinutes();
	let now_h = now.getHours();

	let pi = Math.PI;

	let second_hand_len = size * 0.4;
	let second_ang = - now_s / 60 * 2 * pi + pi;
	let second_hand_x_end = parseInt(size/2 + Math.sin(second_ang) * second_hand_len);
	let second_hand_y_end = parseInt(size/2 + Math.cos(second_ang) * second_hand_len);

	ctx.beginPath();
	ctx.moveTo(size/2, size/2);
	ctx.lineTo(second_hand_x_end, second_hand_y_end);
	ctx.stroke();

	let minute_hand_len = size * 0.35;
	let minute_ang = - now_m / 60 * 2 * pi + pi;
	let minute_hand_x_end = parseInt(size/2 + Math.sin(minute_ang) * minute_hand_len);
	let minute_hand_y_end = parseInt(size/2 + Math.cos(minute_ang) * minute_hand_len);

	let minute_hand_len_back = size * 0.087;
	let minute_hand_x_end_back = parseInt(size/2 - Math.sin(minute_ang) * minute_hand_len_back);
	let minute_hand_y_end_back = parseInt(size/2 - Math.cos(minute_ang) * minute_hand_len_back);

	let minute_hand_len_L_R = size * 0.025;
	let minute_hand_x_end_L = parseInt(size/2 + Math.sin(minute_ang + pi/2) * minute_hand_len_L_R);
	let minute_hand_y_end_L = parseInt(size/2 + Math.cos(minute_ang + pi/2) * minute_hand_len_L_R);

	let minute_hand_x_end_R = parseInt(size/2 + Math.sin(minute_ang - pi/2) * minute_hand_len_L_R);
	let minute_hand_y_end_R = parseInt(size/2 + Math.cos(minute_ang - pi/2) * minute_hand_len_L_R);

	ctx.beginPath();
	ctx.moveTo(minute_hand_x_end, minute_hand_y_end);
	ctx.lineTo(minute_hand_x_end_L, minute_hand_y_end_L);
	ctx.lineTo(minute_hand_x_end_back, minute_hand_y_end_back);
	ctx.lineTo(minute_hand_x_end_R, minute_hand_y_end_R);
	ctx.lineTo(minute_hand_x_end, minute_hand_y_end);
	ctx.stroke();

	let hour_hand_len = size * 0.3;
	let hour_ang = - now_h / 6 * pi + pi - Math.abs(minute_ang/5);
	let hour_hand_x_end = parseInt(size/2 + Math.sin(hour_ang) * hour_hand_len);
	let hour_hand_y_end = parseInt(size/2 + Math.cos(hour_ang) * hour_hand_len);

	let hour_hand_len_back = size * 0.1;
	let hour_hand_x_end_back = parseInt(size/2 - Math.sin(hour_ang) * hour_hand_len_back);
	let hour_hand_y_end_back = parseInt(size/2 - Math.cos(hour_ang) * hour_hand_len_back);

	let hour_hand_len_L_R = size * 0.036;
	let hour_hand_x_end_L = parseInt(size/2 + Math.sin(hour_ang + pi/2) * hour_hand_len_L_R);
	let hour_hand_y_end_L = parseInt(size/2 + Math.cos(hour_ang + pi/2) * hour_hand_len_L_R);

	let hour_hand_x_end_R = parseInt(size/2 + Math.sin(hour_ang - pi/2) * hour_hand_len_L_R);
	let hour_hand_y_end_R = parseInt(size/2 + Math.cos(hour_ang - pi/2) * hour_hand_len_L_R);

	ctx.beginPath();
	ctx.moveTo(hour_hand_x_end, hour_hand_y_end);
	ctx.lineTo(hour_hand_x_end_L, hour_hand_y_end_L);
	ctx.lineTo(hour_hand_x_end_back, hour_hand_y_end_back);
	ctx.lineTo(hour_hand_x_end_R, hour_hand_y_end_R);
	ctx.lineTo(hour_hand_x_end, hour_hand_y_end);

	ctx.stroke();
}

function skat45_content(win) {
	win.append('<div id="skat45_texts" class="Skat45Texts"></div><img src="PROFILE_PHOTO.png"></img>');
	let text_div = $('#skat45_texts');
	text_div.attr('id', '');
	text_div.append('<h4 style="font-size: 1.3em;">Hi, and welcome to my personal web page.<h4>');
	text_div.append("<p>I'm SKAT45, physicist, musician and full stack web developer.</p>");
	text_div.append('<div class="SkatBTNs"><div class="AboutSkatBTN">About author</div><div class="CloseSkatBTN">Close</div></div>');
	$('.AboutSkatBTN').off('click');
	$('.AboutSkatBTN').click(function() {
		start_program('NOTEPAD', ['About', all_apps_and_fles['About'][3]]);
		$(this).parents('.Win').remove();
	});
	$('.CloseSkatBTN').off('click');
	$('.CloseSkatBTN').click(function() {
		$(this).parents('.Win').remove();
	});
}

function NOTEPAD_content(win, text) {
	win.append('<textarea spellcheck="false"></textarea>');
	if (!text) {
		win.parents('.Window').children('.ControlPanel').children('.movePlace').children('span').text('Notepad - (Untitled)');
		win.parents('.Win').attr('file', 'falsefalsefalse');
	}

	else {
		win.parents('.Window').children('.ControlPanel').children('.movePlace').children('span').text('Notepad - ' + text[0] + '');
		win.children('textarea').append(text[1]);
		win.parents('.Win').attr('file', text[0]);
	}
}

function popit_content(win) {
	win.css('padding', 0);
	win.append('<div class="Popit"><div class="Row"><div class="One"></div><div class="One"></div><div class="One"></div><div class="One"></div></div><div class="Row"><div class="One"></div><div class="One"></div><div class="One"></div><div class="One"></div></div><div class="Row"><div class="One"></div><div class="One"></div><div class="One"></div><div class="One"></div></div><div class="Row"><div class="One"></div><div class="One"></div><div class="One"></div><div class="One"></div></div></div>');
}

function prog_menu_option_click(program, option) {
	let btn = $('.ActiveWindow').children('.Window').children('.ControlPanel').children('.FuctionBTN');
	switch (program) {
		case 'MSDOS':
			switch (option) {
				case 'Exit':
					btn.trigger('dblclick');
					break;
				case 'About MS-DOS Exec...':
					about_prog(program);
					break;
				case 'End session':
					end_session();
					break;
			}
			break;
		case 'CALC':
			switch (option) {
				case 'Exit':
					btn.trigger('dblclick');
					break;
				case 'About Calculator':
					about_prog(program);
					break;
			}
			break;
		case 'NOTEPAD':
			switch (option) {
				case 'About Notepad...':
					about_prog(program);
					break;
				case 'Exit':
					btn.trigger('dblclick');
					break;
				case 'Select all':
					$('.ActiveWindow').children('.Window').children('.WindowBody').children('textarea').select();
					break;
				case 'Save':
					if ($('.ActiveWindow').attr('file') != 'falsefalsefalse') all_apps_and_fles[$('.ActiveWindow').attr('file')][3] = $('.ActiveWindow').children('.Window').children('.WindowBody').children('textarea').val();
					else save_as(true);
					break;
				case 'Save As...':
					let not_named;
					if ($('.ActiveWindow').attr('file') != 'falsefalsefalse') not_named = false;
					else not_named = true;
					save_as(not_named);
					break;
				case 'New':
					start_program('NOTEPAD', false)
					break;
			}
			break;
	}	
}

function about_prog(program) {
	let win_w = $(window).width();
	let win_h = $(window).height();
	$('body').append('<div class="BlockDiv"></div>');
	$('.BlockDiv').css('width', win_w);
	$('.BlockDiv').css('height', win_h);
	$('.BlockDiv').css('z-index', max_zet_index + 1);
	$('.BlockDiv').append('<div class="AboutProgWindow"></div>');
	$('.AboutProgWindow').append('<div class="AboutProgWindowBody"></div>');
	let win = $('.AboutProgWindowBody');

	win.append('<img src="' + icons[program] + '">');
	if (program == 'MSDOS') program = 'MS-DOS Executive';
	else if (program == 'CALC') program = 'Calculator';
	win.append('<div>SKAT45\'s winda project<br>' + program + '<div><br><br>Version 1.02<br>Copyright © SKAT45');
	win.append('<div class="AboutOKCloseBTN">OK</div>');
	win.append('<hr><div>Disk Space Free: 43K<br>Memory Free: 383K</div>');

	$('.AboutOKCloseBTN').click(function() {
		$('.BlockDiv').remove();
	});
}

function save_as(not_named) {
	let win_w = $(window).width();
	let win_h = $(window).height();
	$('body').append('<div class="BlockDiv"></div>');
	$('.BlockDiv').css('width', win_w);
	$('.BlockDiv').css('height', win_h);
	$('.BlockDiv').css('z-index', max_zet_index + 1);
	$('.BlockDiv').append('<div class="AboutProgWindow"></div>');
	$('.AboutProgWindow').append('<div class="AboutProgWindowBody"></div>');
	let win = $('.AboutProgWindowBody');
	win.css('width', '350px');
	win.css('text-align', 'left');
	win.css('padding-left', '10px');

	win.append('<div>Save File Name As: A:\\</div>');
	win.append('<div id="text_and_btns"></div>');
	let txt_btns = $('#text_and_btns');
	txt_btns.append('<input></input>');
	if (not_named) txt_btns.children('input').val('NotNamed');
	else txt_btns.children('input').val($('.ActiveWindow').attr('file'));
	txt_btns.append('<div><div id="OkSave">OK</div><div id="NoSave">Cansel</div></div>');

	$('#OkSave').click(function() {
		let this_file_name = txt_btns.children('input').val();
		all_apps_and_fles[this_file_name] = ['TXT', 1234, [[8, 12, 98], [10, 15]], $('.ActiveWindow').children('.Window').children('.WindowBody').children('textarea').val()];
		$('.ActiveWindow').children('.Window').children('.ControlPanel').children('.movePlace').children('span').text('Notepad - ' + this_file_name);
		$('.ActiveWindow').attr('file', this_file_name);
		$('.BlockDiv').remove();
		update_apps_list();
	});

	$('#NoSave').click(function() {
		$('.BlockDiv').remove();
	});
}

function update_apps_list() {
	$('.Win[program="MSDOS"]').children('.Window').children('.WindowBody').children('ul').children().remove();
	for (let key of Object.keys(all_apps_and_fles)) {
		$('.Win[program="MSDOS"]').children('.Window').children('.WindowBody').children('ul').append('<li name="' + key +'" ' + 'type="' + all_apps_and_fles[key][0] +'"' + '>' + key + '.' + all_apps_and_fles[key][0] + '</li>');
	}
}
