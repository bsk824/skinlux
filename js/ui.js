$(function() {
	$.fn.gnb = function() {
		var gnbWrap = $(this)
			,depth1Menu = gnbWrap.find('.gnbMenu > ul > li > a')
			,depth2 = gnbWrap.find('.depth2')
			,menuBtn = $('.btnMobNav')
			,menuClose = $('.btnClose');

		menuBtn.on('click', function(){
			$('body').addClass('menuOn');
			gnbWrap.slideDown(300);
		});
		menuClose.on('click', function(){
			$('body').removeClass('menuOn');
			gnbWrap.slideUp(300);
		});
		depth1Menu.on({
			'mouseenter' : function(){
				if ($(window).width() > 1023) {
					var $this = $(this);
					$this.parent().siblings().removeClass('current').find('.depth2').stop().slideUp(200);
					$this.next().stop().slideDown(200).parent().addClass('current');
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
				depth2.stop().slideUp(200).parent().removeClass('current');
			}
		});
	}
	$('#gnb').gnb();
});

function tabContent(obj) {
	var $this = $(obj),
		tapBtn = $this.find('a, button');

	tapBtn.on('click',function(){
		var _this = $(this);
		
		_this.parent().addClass('active').siblings().removeClass('active');
		if (_this.attr('href')) {
			$(_this.attr('href')).addClass('active').siblings().removeClass('active');
		}
		return false;
	});
}

function activeField(obj) {
	var $this = $(obj)
		field = $this.parent().find('fieldset');
	if ($this.find('input[type="radio"]').prop('checked',true)) {
		field.removeClass('disable');
		$this.parent().siblings().find('fieldset').addClass('disable');
	}
}

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

function getCookie(name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");

		if (x==name) return unescape(y);
	}
}
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/* ie 버전 체크 */
function getInternetVersion(ver) {
	var rv = -1; // Return value assumes failure.
	var ua = navigator.userAgent;
	var re = null;
	if(ver == "MSIE"){
		re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	}else{
	re = new RegExp(ver+"/([0-9]{1,}[\.0-9]{0,})");
		}
	if (re.exec(ua) != null){
		rv = parseFloat(RegExp.$1);
	}
	return rv;
}
// Check the Browser Type and Version
function browserCheck() {
	var ver = 0; // Browser Version
	if(navigator.appName.charAt(0) == "M"){
		ver = getInternetVersion("MSIE");
		if (ver < "9"){
			$('body').prepend('<div id="version"><p>고객님께서는 현재 Internet Explorer 구형버전으로 접속 중이십니다. 이 사이트는 Internet Explorer 최신버전에 최적화 되어 있습니다. <a href="http://windows.microsoft.com/ko-kr/internet-explorer/download-ie" target="_blank">Internet Explorer 업그레이드 하기</a></p><p>만약 WINDOW XP를 사용 중이시라면 구글 크롬을 설치 하여주시기 바랍니다. <a href="https://www.google.co.kr/chrome/browser/desktop/">구글 크롬 설치 하기</a></p> <button type="button" class="versionClose">X</button></div>');
		}
	}
}
browserCheck();

$('#version').on('click','.versionClose',function(){
	$('#version').hide();
});