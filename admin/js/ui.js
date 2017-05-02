$(function(){
	$.fn.gnb = function() {
		var gnbWrap = $(this)
			,depth1Menu = gnbWrap.find('.gnbNav > ul > li > a')
			,depth2 = gnbWrap.find('.depth2')
			,bg2depth = gnbWrap.find('.bg2depth')
			,menuBtn = $('.btnMobNav')
			,depth2H = 0;
		
		/*if (winW > 1023) {
			$('.depth2').each(function(){
				var _thisH = $(this).height();
				if (_thisH > depth2H) depth2H = _thisH + 30;
			});
			depth2.css('height',depth2H + 'px');
			bg2depth.css('height',depth2H + 'px');
		}
		$(window).resize(function(){
			if (winW > 1023) {
				$('.depth2').each(function(){
					var _thisH = $(this).height();
					if (_thisH > depth2H) depth2H = _thisH + 30;
				});
				depth2.css('height',depth2H + 'px');
				bg2depth.css('height',depth2H + 'px');
			}
		});*/
		menuBtn.on('click', function(){
			$(this).toggleClass('close');
			gnbWrap.slideToggle(300);
		});
		depth1Menu.on({
			'mouseenter' : function(){
				if ($(window).width() > 1023) {
					depth2.slideDown(300);
				}
			},
			'click' : function(){
				var $this = $(this);
				if ($(window).width() <= 1023) {
					if (!$this.parent().hasClass('active')) {
						depth2.slideUp(300);
						$this.next().slideDown(300).parent().addClass('active').siblings().removeClass('active');
					} else {
						$this.next().slideUp(300).parent().removeClass('active');
					}
					if ($this.next().hasClass('depth2')) return false;
				}
			}
		});
		gnbWrap.on('mouseleave', function(){
			if ($(window).width() > 1023) {
				depth2.stop().slideUp(300);
			}
		});
	}
	//$('#gnb').gnb();

	$.fn.snb = function() {
		var snbWrap = $(this)
			,acoMenu = $('.acoNav > ul > li > a');

		acoMenu.click(function(){
			var _this = $(this);
			if (!_this.hasClass('open')) {
				_this.next().slideDown(300);
				_this.addClass('open');
			} else {
				_this.next().slideUp(300);
				_this.removeClass('open');
			}
			return false;
		});
	}
	$('#snb').snb();

	$.fn.tabMenu = function() {
		$(this).each(function(){
			var $this = $(this)
				,tabBtn = $this.find('.tabBtn')
				,menu = $this.find('> ul')
				,menuBtn = menu.find('> li button, > li a');

			tabBtn.text(menu.find('.on a').text());
			menuBtn.click(function(){
				var _this = $(this);
				_this.parent().addClass('on').siblings().removeClass('on');
				tabBtn.text(menu.find('.on a').text());
				if ($(window).width() <= 560) menu.hide();
			});
			tabBtn.click(function(){
				var _this = $(this)
				tabBtn.text(menu.find('.on a').text());
				_this.toggleClass('active').next().slideToggle(300);
			});
		});
	};
	$('.tabMenu').tabMenu();

	$('.btnSnb').click(function(){
		var $this = $(this);
		if (!$this.hasClass('returnSnb')) {
			$('#snb').css('overflow','hidden').animate({'width' : '0'},300);
			$('#contents').animate({'width' : '1000px'},300);
			$this.animate({'margin-left':'-510px'},300,function(){$this.addClass('returnSnb')});
		} else {
			$('#snb').css('overflow','').animate({'width' : '150px'},300);
			$('#contents').animate({'width' : '820px'},300);
			$this.animate({'margin-left':'-340px'},300,function(){$this.removeClass('returnSnb')});
		}
	});
	$('.searchToggle').click(function(){
		if (!$(this).hasClass('openSearch')) {
			var baseH = $('.searchTable').height()
				searcH = $('.searchTable > table').height();
			$('.searchTable').animate({'height':searcH+'px'},300);
			$(this).addClass('openSearch');
		} else {
			$('.searchTable').animate({'height' : baseH+'px'},300);
			$(this).removeClass('openSearch');
		}
	});
	$(".datepicker").datepicker({
		changeYear: true,
		changeMonth: true,
		showMonthAfterYear: true,
		yearSuffix: "년",
		showOn: "button",
		buttonText: "날짜선택",
		prevText: "이전달",
		nextText: "다음달",
		dateFormat: "yy / mm / dd",
		dayNamesMin: ["일","월","화","수","목","금","토"],
		monthNamesShort: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
	});
	
});
var winW = $(window).width();
function fontSize(w) {
	if (w <= 560) {
		var fontSize = w / 5.12;
		$('html').css('font-size', Math.floor(fontSize*100)/100 + '%');
	} else {
		$('html').css('font-size','62.5%');
	}
	
}
fontSize(winW);
$(window).resize(function(){
	var winW = $(window).width();
	fontSize(winW);
});