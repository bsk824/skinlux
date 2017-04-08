$(function() {
	if (getCookie('hello') != 'end') {
		var hello = $('.hello');
		hello.show();
		setTimeout(function(){
			hello.addClass('startHello');
		},1);
		setTimeout(function(){
			hello.fadeOut();
			setCookie('hello','end',1);
		},8000);
	}
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
			$('body').prepend(
				'<div id="version"><p>고객님께서는 현재 Internet Explorer 구형버전으로 접속 중이십니다. 이 사이트는 Internet Explorer 최신버전에 최적화 되어 있습니다. <a href="http://windows.microsoft.com/ko-kr/internet-explorer/download-ie" target="_blank">Internet Explorer 업그레이드 하기</a></p><p>만약 WINDOW XP를 사용 중이시라면 구글 크롬을 설치 하여주시기 바랍니다. <a href="https://www.google.co.kr/chrome/browser/desktop/">구글 크롬 설치 하기</a></p> <button type="button" class="versionClose">X</button></div>'
			)
		}
	}
}
browserCheck();

$('#version').on('click','.versionClose',function(){
	$('#version').hide();
});