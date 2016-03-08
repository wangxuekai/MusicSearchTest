
window_focus=function()
{
	window.removeEventListener("focus",window_focus,true);
	window.addEventListener("blur",window_blur,true);
	
	if(lrc_order.length>1)
	{
		$(".lrc_box_frame").hide();
		$(".lrc_box").html(lrc_order_text);
		lrc_box_show();
	}
	else
		lrc_box_hide();
}
window_blur=function()
{
	window.removeEventListener("blur",window_blur,true);
	window.addEventListener("focus",window_focus,true);
}
window.addEventListener("blur",window_blur,true);



now_title="";
now_artist="";

lrcs="";
lrc_order="";
lrc_map="";
lrc_order_text="";
function player_getlrc(){
	
	/*-------------------------载入歌词*/
				lrcs=new Array();
				lrc_order=new Array();
				lrc_map=new Array();
				lrc_order_text="";
						
				$post("MyApp/MusicSearch/lrc_search.php",{
					'title':now_title,
					'artist':now_artist
					},function(result){
						
						
						lrcs=lrcResolver(result);
						lrc_order[0]="　";
						for(i=0,j=1;i<lrcs.length;i++)
						{
							if(lrcs[i]!=null)
							{
								lrc_order[j]=lrcs[i];
								lrc_map[i]=j;
								j++;
								lrc_order_text=lrc_order_text+"<p>"+lrcs[i]+"</p>";
							}
						}
						if(lrc_order.length>1)
						{
							$(".lrc_box_frame").hide();
							$(".lrc_box").html(lrc_order_text);
							lrc_box_show();
						}
						else
							lrc_box_hide();
					});
					
			//-------------------------
			
	}
//---------------------------------------------------------------------------------------music
//Global variable to track current file name  

currentFile="";
time_check=setTimeout(function(){},1);
dead_time=0;//随机播放的时候连续死链的次数

function playAudio(url,title,artist,album) {
	try {

		if(url==0)
			url=currentFile;
		//return objects we need to work with 
		var oAudio = document.getElementById('myaudio'); 
		var btn = document.getElementById('play');
		var audioURL = url;     
		
	
		//Skip loading if current file hasn't changed.
		if (audioURL!= currentFile) {
	
			now_title=title;//player_getlrc里的变量
			now_artist=artist;
			
			clearTimeout(time_check);
			time_check=setTimeout(function(){//检查死链
				if( !oAudio.paused && !oAudio.duration)//是播放、无连接上状态
				{
					$(".music_info").html("歌曲暂时链接不上...");
					dead_time++;
					if(dead_time<10 && $("#rand_checkbox").attr("checked"))//随机状态链接失效重选歌
					{
						rand_play();
					}
				}
				else
					dead_time=0;
			},13000);
			
	
			try{
				player_getlrc();
			}
			catch(e)
			{}
			
			if(title!="")
				title="《"+title+"》——";
			if(album!="")
				album="《"+album+"》——";
			
			$(".music_info").html(title+album+artist);
			oAudio.src = audioURL;
			currentFile = audioURL;  
			btn.disabled=false;                      
		}

		//Tests the paused attribute and set state. 
		if (oAudio.paused) {
			oAudio.play();
			btn.textContent = "暂停";
		}
		else {
			oAudio.pause();
			btn.textContent = "播放";
		}
	}
	catch (e) {
		// Fail silently but show in F12 developer tools console
		if (window.console && console.error("Error:" + e));
		
	}
}
function initEvents() {
	var canvas = document.getElementById('canvas');  
	var oAudio = document.getElementById('myaudio');

	//set up event to toggle play button to pause when playing
	oAudio.addEventListener("playing", function() {
		document.getElementById("play").textContent = "暂停";
	}, true);

	//set up event to toggle play button to play when paused
	oAudio.addEventListener("pause", function() {
		document.getElementById("play").textContent = "播放";
	}, true);
	//set up event to update the progress bar
	oAudio.addEventListener("timeupdate", progressBar, true); 
	//set up mouse click to control position of audio
	canvas.addEventListener("click", function(e) {
		//this might seem redundant, but this these are needed later - make global to remove these
		var oAudio = document.getElementById('myaudio'); 
		var canvas = document.getElementById('canvas');            

		if (!e) {
			e = window.event;
		} //get the latest windows event if it isn't set
		try {
			//calculate the current time based on position of mouse cursor in canvas box
			if((oAudio.buffered.end(0) / oAudio.duration) >
			 	(e.offsetX / canvas.clientWidth))
			oAudio.currentTime = oAudio.duration * (e.offsetX / canvas.clientWidth);
		}
		catch (err) {
		// Fail silently but show in F12 developer tools console
			if (window.console && console.error("Error:" + err));
		}
	}, true);
	
	canvas.addEventListener("mousemove", function(e) {
		//this might seem redundant, but this these are needed later - make global to remove these
 
		var canvas = document.getElementById('canvas');            

		if (!e) {
			e = window.event;
		} //get the latest windows event if it isn't set
		try {
			//calculate the current time based on position of mouse cursor in canvas box
			var times=oAudio.duration * (e.offsetX / canvas.clientWidth);
			var t_min=parseInt(times/60);
			var t_sec=parseInt(times%60);
			var t_times=t_min+":"+t_sec;
			
			$("#canvas").attr("title",t_times);
		}
		catch (err) {
		// Fail silently but show in F12 developer tools console
			if (window.console && console.error("Error:" + err));
		}
	}, true);
}




function progressBar() { 
	var oAudio = document.getElementById('myaudio'); 
	var time = document.getElementById('time'); //---------------------时间
	//get current time in seconds
	
	if(oAudio.currentTime>=oAudio.duration && $("#rand_checkbox").attr("checked"))
		rand_play();
	
	if(oAudio.currentTime>=oAudio.duration && $("#recommend_playall").html()=="取消播放全部")
	{
		
		if(recommend_list<$(".hotlist_box_music").length)
		{
			var obj=$(".hotlist_box").children(".hotlist_box_music:eq("+recommend_list+")");
			play_recommend(obj);
			recommend_list++;
		}
		else
			stop_recommend_all();
		
	}
	var now_time=parseInt(oAudio.currentTime);
	

	if(lrc_order_text!="")
	{
		if(lrc_map[now_time]!=null)//---------------语句更新
		{
			var lrc_step=lrc_map[now_time]-1;
			var lrc_step_move=-lrc_step*20+"px";
			$(".lrc_box p").css("color","#999");
			$(".lrc_box p:eq("+lrc_step+")").css("color","#fff");
			$(".lrc_box").stop(true);
			$(".lrc_box").animate({top:lrc_step_move},350);
		}
		
	}
	
	
	try
	{
	//缓冲的宽度
	var fbuffWidth = parseInt( (oAudio.buffered.end(0) / oAudio.duration) * (canvas.clientWidth));
	$("#canvas_buff").stop(true);
	$("#canvas_buff").animate({width:fbuffWidth},150);
	
	//播放的宽度
	var fWidth = parseInt( (oAudio.currentTime / oAudio.duration) * (canvas.clientWidth));
	$("#canvas_playing").stop(true);
	$("#canvas_playing").animate({width:fWidth},150);
	}
	catch(e)
	{}
}
//this event gets fired when a page has loaded
try
{window.addEventListener("DOMContentLoaded", initEvents, false);
}
catch(e)
{}