var n=0,aniINT;
logo_css3=document.getElementById("logo");
function logo_animate()
{
	clearInterval(aniINT);
	aniINT=setInterval("startAni()",15);
}
function startAni()
{
	n=n+5;

	logo_css3.style.transform="rotate(" + n + "deg) "+"rotateY(" + n + "deg)";
	logo_css3.style.webkitTransform="rotate(" + n + "deg) "+"rotateY(" + n + "deg)";
	
	logo_css3.style.OTransform="rotate(" + n + "deg) "+"rotateY(" + n + "deg)";
	logo_css3.style.MozTransform="rotate(" + n + "deg) "+"rotateY(" + n + "deg)";
	
	if(n==90)
			//logo_css3.src="MyApp/MusicSearch/img/logo_back.jpg";
        logo_css3.src="MyApp/MusicSearch/img/xqye.png";
    
	if(n==270)
			logo_css3.src="MyApp/MusicSearch/img/logo.png";	
	
	if (n==180 || n==360)
	{
		clearInterval(aniINT);
		if (n==360){n=0;}
		
	}
}


setTimeout(function(){
	$(".head_img_box").mouseenter(function(){logo_animate()});
	$(".head_img_box").mouseleave(function(){logo_animate()});
	},5000);
