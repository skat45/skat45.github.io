let rolled_apps = [];
let windowMowing = false;
let sizeChanging = false;
let windowSizeChanged = 0;
let changeSizeSide = '';
let cursor_pos_temp = {'x': 0, 'y': 0};
let cursor_pos_now = {'x': 0, 'y': 0};
let movedWin = 0;
let max_zet_index = 1;
let min_win_width = 222;
let min_win_height = 30;
// false - оризонтальная черта в списке
let window_menu_options = ['Minimize', 'Maximize', false, 'Close'];
let window_menu_is_open = false;
let window_menu_closed_yet = false;
let rolled_window_menu_options = ['Restore', 'Minimize', 'Maximize', false, 'Close'];
let rolled_window_menu_is_open = false;
let prog_menu_was_opened = false;

let last_window_position = {'x': 5, 'y': 5};

$(document).ready(function () {

	jquery_links();

	$(document).mousemove(function(e) {
		cursor_pos_now['x'] = e.pageX;
		cursor_pos_now['y'] = e.pageY;
	});

	start_program('MSDOS');
	start_program('SKAT45');

	setInterval(function() {
		$('canvas[class="HourHands"]').each(function() {
			$(this).attr('id', 'canv');
			let hands = document.getElementById('canv');
			let ctx = hands.getContext('2d');
			update_time($(this), ctx, $(this).width());
			$(this).attr('id', '')
		});

		$('.ClockIconCanvas').each(function() {
			$(this).attr('width', $(this).attr('width'));
			let now = new Date();
			let now_m = now.getMinutes();
			let now_h = now.getHours();
			let pi = Math.PI;
			$(this).attr('id', 'hour_fase_icon');
			let hands = document.getElementById("hour_fase_icon");
			let ctx = hands.getContext('2d');
			$('#hour_fase_icon').attr('id', '');

			let munute_hand_len = 13;
			let hour_hand_len = 10;
			let minute_ang = - now_m / 60 * 2 * pi + pi;
			let hour_ang = - now_h / 6 * pi + pi - Math.abs(minute_ang/5);


			ctx.beginPath();
			ctx.moveTo(16, 16);
			ctx.lineTo(parseInt(16 + Math.sin(minute_ang) * munute_hand_len), parseInt(16 + Math.cos(minute_ang) * munute_hand_len));
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(16, 16);
			ctx.lineTo(parseInt(16 + Math.sin(hour_ang) * hour_hand_len), parseInt(16 + Math.cos(hour_ang) * hour_hand_len));
			ctx.stroke();
		});
	}, 1000);

	if ($('body').css('background-color') == 'rgb(0, 0, 0)') window.open("mobile.html","_self");
	console.log($('body').css('background-color'));
});

function pressed(win) {
	let elem = $('.ActiveWindow');
	elem.removeClass('ActiveWindow');
	elem.addClass('NotActiveWindow');
	$(win).addClass('ActiveWindow');
	$(win).removeClass('NotActiveWindow');
	$(win).css('z-index', max_zet_index);
	max_zet_index += 1;

	$('body').append('<div id="only_border" style="position: absolute;"></div>');
	$('#only_border').css('left', $('.ActiveWindow').css('left'));
	$('#only_border').css('top', $('.ActiveWindow').css('top'));
	$('#only_border').css('width', $('.ActiveWindow').css('width'));
	$('#only_border').css('height', $('.ActiveWindow').css('height'));
	$('#only_border').css('z-index', max_zet_index);
	if (win.attr('roll') == 'false') $('#only_border').css('border', 'solid 0.5px grey');

	windowMowing = true;

	cursor_pos_temp['x'] = cursor_pos_now['x'];
	cursor_pos_temp['y'] = cursor_pos_now['y'];

	movedWin = win;

	moveWinFunk();
	jquery_links();
}

function pulled() {
	if (windowMowing) {
		$(movedWin).css('left', $('#only_border').css('left'));
		$(movedWin).css('top', $('#only_border').css('top'));
		$('#only_border').remove();
		windowMowing = false;
	}

	if (sizeChanging) {
		windowSizeChanged.css('width', $('#only_border').css('width'));
		windowSizeChanged.css('height', $('#only_border').css('height'));
		windowSizeChanged.css('left', $('#only_border').css('left'));
		windowSizeChanged.css('top', $('#only_border').css('top'));
		windowSizeChanged.children('.Window').css('width', 'calc(100% - 2.5px)');
		windowSizeChanged.children('.Window').css('height', 'calc(100% - 2.5px)');
		$('#only_border').remove();

		let borders = windowSizeChanged.children('.WindowsBorders');
		borders.children('.BorderRight').css('left', windowSizeChanged.css('width'));
		borders.children('.BorderTop, .BorderBottom').css('width', windowSizeChanged.css('width'));
		borders.children('.BorderLeft, .BorderRight').css('height', 'calc(' + windowSizeChanged.css('height') + ' + 10px)');

		if (windowSizeChanged.attr('program') == 'CLOCK') clock_change_size(windowSizeChanged.children('.Window').children('.WindowBody'));
		sizeChanging = false;
	}

	jquery_links();
}


function moveWinFunk() {
	let dX = cursor_pos_now['x'] - cursor_pos_temp['x'];
	let dY = cursor_pos_now['y'] - cursor_pos_temp['y'];
	cursor_pos_temp['x'] = cursor_pos_now['x'];
	cursor_pos_temp['y'] = cursor_pos_now['y'];
	let x = $('#only_border').css('left');
	let y = $('#only_border').css('top');

	let newX = '';
	let newY = '';
	for (let i = 0; newX.length < (x + '').length - 2; i++) {
		newX += (x + '')[i];
	}
	for (let i = 0; newY.length < (y + '').length - 2; i++) {
		newY += (y + '')[i];
	}

	y = parseInt(y) + dY;
	if (y >= 0) {
		y += 'px';
	}

	x = parseInt(x) + dX;
	x += 'px';
	$('#only_border').css('left', x);
	$('#only_border').css('top', y);

	jquery_links();

	if (windowMowing) setTimeout(moveWinFunk, 30);
}

function change_win_size() {
	if (!sizeChanging) return 0;

	let dX = cursor_pos_now['x'] - cursor_pos_temp['x'];
	let dY = cursor_pos_now['y'] - cursor_pos_temp['y'];
	cursor_pos_temp['x'] = cursor_pos_now['x'];
	cursor_pos_temp['y'] = cursor_pos_now['y'];
	let top = parseFloat($('#only_border').css('top').slice(0, -2));
	let left = parseFloat($('#only_border').css('left').slice(0, -2));
	let width = parseFloat($('#only_border').css('width').slice(0, -2));
	let height = parseFloat($('#only_border').css('height').slice(0, -2));

	switch (changeSizeSide) {
		case 'r':
			if (cursor_pos_now['x'] >= left + min_win_width) {
				if (dX < 0) {
					dX *= -1;
					$('#only_border').css('width', 'calc(' + $('#only_border').css('width') + ' - ' + dX + 'px)');
				}
				else $('#only_border').css('width', 'calc(' + $('#only_border').css('width') + ' + ' + dX + 'px)');
			}
			break;

		case 'b':
			if (cursor_pos_now['y'] >= top + min_win_height) {
				if (dY < 0) {
					$('#only_border').css('height', 'calc(' + $('#only_border').css('height') + ' - ' + dY*(-1) + 'px)');
				}
				else $('#only_border').css('height', 'calc(' + $('#only_border').css('height') + ' + ' + dY + 'px)');
			}
			break;

		case 'l':
			if (width >= min_win_width || cursor_pos_now['x'] < left) {
				if (dX < 0) {
					dX *= -1;
					$('#only_border').css('width', 'calc(' + $('#only_border').css('width') + ' + ' + dX + 'px)');
					$('#only_border').css('left', 'calc(' + $('#only_border').css('left') + ' - ' + dX + 'px)');
				}
				else {
					$('#only_border').css('width', 'calc(' + $('#only_border').css('width') + ' - ' + dX + 'px)');
					$('#only_border').css('left', 'calc(' + $('#only_border').css('left') + ' + ' + dX + 'px)');
				}
			}
			break;

		case 't':
			if (height >= min_win_height || cursor_pos_now['y'] < top)
			if (dY < 0) {
				$('#only_border').css('height', 'calc(' + $('#only_border').css('height') + ' + ' + dY*(-1) + 'px)');
				$('#only_border').css('top', 'calc(' + $('#only_border').css('top') + ' - ' + dY*(-1) + 'px)');
			}
			else {
				$('#only_border').css('height', 'calc(' + $('#only_border').css('height') + ' - ' + dY + 'px)');
				$('#only_border').css('top', 'calc(' + $('#only_border').css('top') + ' + ' + dY + 'px)');
			}
			break;
	}

	if (sizeChanging) setTimeout(change_win_size, 30);
}

function close_window(win) {
	if (win.attr('program') == 'MSDOS') {
		var msdos_win_counter = 0;

		$('.Win').each(function() {if ($(this).attr('program') == 'MSDOS') msdos_win_counter++;});
		if (msdos_win_counter < 2) {
			end_session();
			return false;
		}
		else {
			win.remove();
			return true;
		}
	}
	else win.remove();
	return true;
}


function jquery_links() {
	$(document).off('mouseup');
	$(document).mouseup(function(e) {
		pulled();

		if (window_menu_is_open) {
			if (!$('#window_menu').is(e.target) && !$('.FuctionBTN').is(e.target)) {
				$('#window_menu').remove();
				window_menu_is_open = false;
				window_menu_closed_yet = true;
			}
			else if ($('.FuctionBTN').is(e.target)) {
				if (window_menu_is_open) {
					$('.FuctionBTN').off('click');
					$('#window_menu').remove();
					window_menu_is_open = false;
					window_menu_closed_yet = true;
					jquery_links();
				}
			}
		}
		else window_menu_closed_yet = false;

		if (rolled_window_menu_is_open) {
			if (!$('#rolled_window_menu').is(e.target) && !$('#rolled_window_menu').parent().children('img').is(e.target)) {
				$('#rolled_window_menu').remove();
				rolled_window_menu_is_open = false;
			}
		}
		if (prog_menu_was_opened) {
			if (!$('#prog_menu').is(e.target)) {
				$('#prog_menu').remove();
				prog_menu_was_opened = false;
			}
		}
	});

	$('.movePlace').off('mousedown');
	$('.movePlace').mousedown(function() {
		pressed($(this).parent().parent().parent());
	});

	$('.RollDownBTN').off('click');
	$('.RollDownBTN').click(function() {
		let elem = $(this).parent().parent().parent().parent();
		elem.fadeOut(10);
		let newElem = '<div id="new_icon"><img class="Icon" src="' + elem.attr('image') + '" sourse="' + rolled_apps.length +'"></div>';
		rolled_apps[rolled_apps.length] = elem;
		$('.IconPanel').append(newElem);
		if (elem.attr('program') == 'CLOCK') $('#new_icon').prepend('<canvas width="32" height="32" class="ClockIconCanvas"></canvas>');
		$('#new_icon').attr('id', '');

		$('.Icon').off('dblclick');
		$('.Icon').dblclick(function() {
			let elem = rolled_apps[parseInt($(this).attr('sourse'))];
			elem.fadeIn(10);
			$(this).fadeOut(10);
			$(this).parent().remove();
		});

		$('.Icon').off('click');
		$('.Icon').click(function() {
			if (!rolled_window_menu_is_open) {
				$(this).parent().prepend('<div class="WindowMenu" id="rolled_window_menu"></div>');
				$('.IconPanel').css('z-index', max_zet_index + 1);
				rolled_window_menu_is_open = true;
				for (let option of rolled_window_menu_options) {
					if (option) $('#rolled_window_menu').append('<div class="WindowMenuOption"><div>' + option + '</div></div>');
					else $('#rolled_window_menu').append('<hr>');
				}
	
				if (rolled_apps[parseInt($(this).attr('sourse'))].attr('roll') == 'false') {
					$('#rolled_window_menu').children('div').children('div').each(function() {
						if ($(this).text() == 'Maximize') $(this).parent().attr('option-available', 'f');
					});
				}
	
				$('.WindowMenuOption').css('width', $('#rolled_window_menu').css('width'));
				let first_option = $('#rolled_window_menu').find(':first-child').find(':first-child').parent();
				first_option.addClass('WindowMenuActiveOption');
	
				$('#rolled_window_menu').css('padding-top', '3px');
				$('#rolled_window_menu').css('top', 'calc(' + $('#rolled_window_menu').css('height') + '*(-1) - 10px)');
	
				$('#rolled_window_menu').mousedown(function() {first_option.removeClass('WindowMenuActiveOption');});
	
				$('.WindowMenuOption').mouseup(function() {
					let rollable = rolled_apps[parseInt($(this).parents('div').children('.Icon').attr('sourse'))].attr('roll');
					let max_min_btn = rolled_apps[parseInt($(this).parents('div').children('.Icon').attr('sourse'))].children('.Window').children('.ControlPanel').children('.WindowMoveBTNs').children('.MaxMin');
					let class_list = max_min_btn.attr('class').split(' ');
					let is_maximized = false;
					$.each(class_list, function(index, item) {if (item == 'Min') is_maximized = true;});
					let win = rolled_apps[parseInt($(this).parents('div').children('.Icon').attr('sourse'))];
	
					switch ($(this).text()) {
						case 'Restore':
							$(this).parents('div').children('.Icon').trigger('dblclick');
							break;
	
						case 'Minimize':
							$(this).parents('div').children('.Icon').trigger('dblclick');
							if (is_maximized && rollable == 'true') max_min_btn.trigger('click');
							if (win.attr('program') == 'CLOCK') clock_change_size(win.children('.Window').children('.WindowBody'));
							break;
		
						case 'Maximize':
							if (!is_maximized && rollable == 'true') {
								$(this).parents('div').children('.Icon').trigger('dblclick');
								max_min_btn.trigger('click');
								if (win.attr('program') == 'CLOCK') clock_change_size(win.children('.Window').children('.WindowBody'));
							}
							break;
		
						case 'Close':
							if (close_window(rolled_apps[parseInt($(this).parents('div').children('.Icon').attr('sourse'))])) {
								$(this).parent('div').parent('div').remove();
							}
							break;
					}
					$('#rolled_window_menu').remove();
					rolled_window_menu_is_open = false;
				});
			}
			else {
				$('#rolled_window_menu').remove();
				rolled_window_menu_is_open = false;
			}
		});
	});

	$('.ClockIconCanvas').off('click');
	$('.ClockIconCanvas').click(function() {
		$(this).parent().children('.Icon').trigger('click');
	});

	$('.ClockIconCanvas').off('dblclick');
	$('.ClockIconCanvas').dblclick(function() {
		$(this).parent().children('.Icon').trigger('dblclick');
	});


	$('.FileList li').off('mousedown');
	$('.FileList li').mousedown(function() {
		$('.ActiveFile').removeClass('ActiveFile');
		$(this).addClass('ActiveFile');
	});

	$('.FileList li').off('dblclick');
	$('.FileList li').dblclick(function() {
		$('.ActiveFile').removeClass('ActiveFile');
		$(this).addClass('ActiveFile');
		switch ($(this).attr('type')) {
			case 'EXE':
				start_program($(this).attr('name'), false);
				break; 

			case 'TXT':
				start_program('NOTEPAD', [$(this).attr('name'), all_apps_and_fles[$(this).attr('name')][3]]);
				break;
		}
	});

	$('.NotActiveWindow').off('click');
	$('.NotActiveWindow').click(function() {
		$('.ActiveWindow').addClass('NotActiveWindow');
		$('.ActiveWindow').removeClass('ActiveWindow');
		$(this).removeClass('NotActiveWindow');
		$(this).addClass('ActiveWindow');
		$(this).css('z-index', max_zet_index);
		max_zet_index += 1;
	});

	$('.WindowsBorders div').off('mousedown');
	$('.WindowsBorders div').mousedown(function() {
		sizeChanging = true;
		$('.ActiveWindow').addClass('NotActiveWindow');
		$('.ActiveWindow').removeClass('ActiveWindow');
		$(this).parents('.NotActiveWindow').addClass('ActiveWindow');
		$(this).parents('.NotActiveWindow').removeClass('NotActiveWindow');
		if ($(this).parents('.ActiveWindow').attr('roll') == 'true') {
			$('body').append('<div id="only_border" style="position: absolute;"></div>');
			$('#only_border').css('left', $('.ActiveWindow').css('left'));
			$('#only_border').css('top', $('.ActiveWindow').css('top'));
			$('#only_border').css('width', $('.ActiveWindow').css('width'));
			$('#only_border').css('height', $('.ActiveWindow').css('height'));
			$('#only_border').css('z-index', max_zet_index);
			switch ($(this).attr('class')) {
				case 'BorderTop':
					changeSizeSide = 't';
					break;
				case 'BorderLeft':
					changeSizeSide = 'l';
					break;
				case 'BorderRight':
					changeSizeSide = 'r';
					break;
				case 'BorderBottom':
					changeSizeSide = 'b';
					break;
			}
			cursor_pos_temp['x'] = cursor_pos_now['x'];
			cursor_pos_temp['y'] = cursor_pos_now['y'];
			windowSizeChanged = $(this).parents('.ActiveWindow');
			change_win_size();
		}
	});

	$('.FuctionBTN').off('click');
	$('.FuctionBTN').click(function() {
		let btn = $(this);

		if (!window_menu_closed_yet) {
			window_menu_is_open = true;

			btn.parent().append('<div class="WindowMenu" id="window_menu"></div>');
			for (let option of window_menu_options) {
				if (option) $('#window_menu').append('<div class="WindowMenuOption"><div>' + option + '</div></div>');
				else $('#window_menu').append('<hr>');
			}
	
			$('.WindowMenuOption').css('width', $('#window_menu').css('width'));
			let first_option = $('#window_menu').find(':first-child').find(':first-child').parent();
			first_option.addClass('WindowMenuActiveOption');

			if (btn.parents('.Win').attr('roll') == 'false') {
				$('#window_menu').children('div').children('div').each(function() {
					if ($(this).text() == 'Size' || $(this).text() == 'Maximize') $(this).parent().attr('option-available', 'f');
				});
			}
	
			$('#window_menu').mousedown(function() {first_option.removeClass('WindowMenuActiveOption');});
	
			$('.WindowMenuOption').mouseup(function() {
				let win = $(this).parents('.Win');
				switch ($(this).text()) {
					case 'Minimize':
						$(this).parents('.ControlPanel').children('.WindowMoveBTNs').children('.RollDownBTN').trigger('click');
						if (win.attr('program') == 'CLOCK') clock_change_size(win.children('.Window').children('.WindowBody'));
						break;
	
					case 'Maximize':
						if ($(this).parents('.Win').attr('roll') == 'true') $(this).parents('.ControlPanel').children('.WindowMoveBTNs').children('.MaxMin').trigger('click');
						if (win.attr('program') == 'CLOCK') clock_change_size(win.children('.Window').children('.WindowBody'));
						break;
	
					case 'Close':
						close_window($(this).parents('.Win'));
						break;
				}
				$('#window_menu').remove();
				window_menu_is_open = false;
			});
		}
		else window_menu_closed_yet = false;

		$('#window_menu').css('top', 'calc(' + btn.css('height') + ' + 1.5px)');


	});

	$('.FuctionBTN').off('dblclick');
	$('.FuctionBTN').dblclick(function() {
		close_window($(this).parents('.Win'));
	});

	$('.Max').off('click');
	$('.Max').click(function() {
		$('.ActiveWindow').addClass('NotActiveWindow');
		$('.ActiveWindow').removeClass('ActiveWindow');
		let win = $(this).parents('.NotActiveWindow')
		win.removeClass('NotActiveWindow');
		win.addClass('ActiveWindow');

		win.attr('temptop', win.css('top'));
		win.attr('templeft', win.css('left'));
		win.attr('tempwidth', win.css('width'));
		win.attr('tempheight', win.css('height'));
		win.css('top', '0px');
		win.css('left', '0px');
		win.css('border', 'solid 0.5px black');
		win.attr('rolled', 't');
		win.css('width', $(window).width());
		win.css('height', $(window).height());
		win.children('.Window').css('width', $(window).width());
		win.children('.Window').css('height', $(window).height());
		let btn = win.children('.Window').children('.ControlPanel').children('.WindowMoveBTNs').children('.Max');
		btn.removeClass('Max');
		btn.addClass('Min');
		btn.attr('src', 'MinimizeBTN.png');

		if (win.attr('program') == 'CLOCK') clock_change_size(win.children('.Window').children('.WindowBody'));
		jquery_links();
	});

	$('.Min').off('click');
	$('.Min').click(function() {
		$('.ActiveWindow').addClass('NotActiveWindow');
		$('.ActiveWindow').removeClass('ActiveWindow');
		let win = $(this).parents('.NotActiveWindow')
		win.removeClass('NotActiveWindow');
		win.addClass('ActiveWindow');

		win.css('top', win.attr('temptop'));
		win.css('left', win.attr('templeft'));
		win.css('width', win.attr('tempwidth'));
		win.css('height', win.attr('tempheight'));
		win.css('border-image', 'url(BorderBackground.png) 5% repeat');
		win.css('border-width', '5px');
		win.css('border-style', 'solid');

		win.children('.Window').css('width', 'calc(100% - 2.5px)');
		win.children('.Window').css('height', 'calc(100% - 2.5px)');

		win.children('.WindowsBorders').children('.BorderRight, .BorderLeft').css('cursor', 'e-resize');
		win.children('.WindowsBorders').children('.BorderTop, .BorderBottom').css('cursor', 'n-resize');
		win.children('.Window').children('.ControlPanel').children('.movePlace').css('cursor', 'move');

		let btn = win.children('.Window').children('.ControlPanel').children('.WindowMoveBTNs').children('.Min');
		btn.removeClass('Min');
		btn.addClass('Max');
		btn.attr('src', 'RollUpBTN.png');

		win.attr('rolled', 'f');

		if (win.attr('program') == 'CLOCK') clock_change_size(win.children('.Window').children('.WindowBody'));
		jquery_links();
	});

	$('.Option').off('click');
	$('.Option').click(function() {
		if (options_panel[$(this).parents('.Win').attr('program')][$(this).text()].length == 0) {
			if ($(this).text() == 'VK') window.open("https://vk.com/andrey_bessonoff");
			else if ($(this).text() == 'Instagram') window.open("https://www.instagram.com/andrey._____________b/");
			else if ($(this).text() == 'GitHub') window.open("https://github.com/skat45");
			return 0;
		}
		$(this).parent().append('<div class="ProgMenu" id="prog_menu"></div>');
		let menu = $('#prog_menu');
		for (let option of options_panel[menu.parents('.Win').attr('program')][$(this).text()]) {
			if (option)	menu.append('<div>' + option + '</div>');
			else menu.append('<hr>');
		}
		let first_option = menu.find(':first-child');
		first_option.addClass('WindowMenuActiveOption');
		menu.mousedown(function() {first_option.removeClass('WindowMenuActiveOption');});
		prog_menu_was_opened = true;

		menu.children().mouseup(function() {
			prog_menu_option_click(menu.parents('.Win').attr('program'), $(this).text());
			menu.remove();
			prog_menu_was_opened = false;
		});
	});

	$('.Popit').children('.Row').children('*').off('click');
	$('.Popit').children('.Row').children('*').click(function() {
		$(this).css('background', 'white');
		var is_off = true;
		$(this).parent('.Row').parent('.Popit').children().children('.One').each(function() {
			if ($(this).css('background') != 'rgb(255, 255, 255) none repeat scroll 0% 0%') {
				is_off = false;
			}
		});
		if (is_off) {
			last_window_position['y'] -= 20;
			start_program('POPIT');
			$(this).parents('.Win').remove();
		}
	});
		

	$('.Win').each(function() {
		let win = $(this);
		if (win.attr('rolled') == 't') {
			win.children('.WindowsBorders').children('div').off('mousedown');
			win.children('.WindowsBorders').children('div').css('cursor', 'default');
			win.children('.Window').children('.ControlPanel').children('.movePlace').css('cursor', 'default');
			win.children('.Window').children('.ControlPanel').children('.movePlace').off('mousedown');
		}
	});

}

function end_session() {
	let win_w = $(window).width();
	let win_h = $(window).height();
	$('body').append('<div class="BlockDiv"></div>');
	$('.BlockDiv').css('width', win_w);
	$('.BlockDiv').css('height', win_h);
	$('.BlockDiv').css('z-index', max_zet_index + 1);
	$('.BlockDiv').append('<div class="WarningCloseWindow"></div>');
	$('.WarningCloseWindow').css('left', 'calc(' + win_w + 'px /2 - 250px)');
	$('.WarningCloseWindow').css('top', 'calc(' + win_h + 'px /2 - 50px)');
	$('.WarningCloseWindow').append('<div class="CloseH"><span><b>End Session</b></span></div>');
	$('.WarningCloseWindow').append('<div class="CloseTextImg"><img src="Warning.png"><div>This will end your Windows session.</div></div>');
	$('.WarningCloseWindow').append('<div style="display: flex;"><div id="ok_close_btn">OK</div><div id="cancel_close_btn">Cancel<div></div>');
	$('#ok_close_btn').mouseup(function() {
		$('body').append('<div id="off_wall"></div>');
		let off_wall = $('#off_wall');
		off_wall.css('display', 'none');
		off_wall.css('width', win_w);
		off_wall.css('height', win_h);
		off_wall.css('background-color', 'black');
		off_wall.css('z-index', max_zet_index + 2);
		off_wall.css('position', 'absolute');
		off_wall.fadeIn(900);
		setTimeout(function() {
			window.open("power_off.html","_self");
		}, 900);
	});
	$('#cancel_close_btn').mouseup(function() {
		$('.BlockDiv').remove();
		$('.WarningCloseWindow').remove();
	});
}
