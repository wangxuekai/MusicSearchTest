function search_submit(){
	
		search_text=$("#search_box").val();

		$("#result_box").fadeOut("fast",function(){
			$("#result_box").html("<p>拼命搜索中...<img src='/img/runningcow.gif' /></p>");
			$("#result_box").fadeIn("fast");
		});
		$post("/search",{'sKey':search_text,'p':page},function(result){
			if(page==0)
			{
				page=1;
			}
			$("#result_box").hide();
			$("#result_box").html(result);

			$("#result_box").fadeIn("fast");
			patch_url();
		},10);
}


$("#search_button").click(function(){
	page=0;
	search_submit();
});
$("#search_box").keydown(function(event){
	 if(event.which==13)
	 {
		page=0;
		$("#search_button").focus();
		//search_submit();
	}
});

/******************************************************翻页按钮的效果************/
$(".pages").click(function(){
	
	var nowpage=page;
	page=parseInt(page)+parseInt($(this).attr("num"));
	if(page<1)
		page=1;
	if(page>total_page)
		page=total_page;

	if(nowpage!=page)
	{
		$(".page_span").animate({fontSize:'14px'},"fast");
		search_submit();
	}
});

//-----------------------------------------------------------------向前翻得按钮
function fadeInOrder(objs,i){
	$(objs[i]).fadeIn(30,function(){
		i++;
		if(i<objs.length)
			fadeInOrder(objs,i);
	});
}
function fadeOutOrder(objs,i){
	$(objs[i]).fadeOut(30,function(){
		i--;
		if(i>=0)
			fadeOutOrder(objs,i);
	});
}
$(".result_box_left .pages_pre_show").mouseenter(function(){

	var i=0;
	fadeInOrder($(".pages_pre_hide"),i);
	});

$(".result_footer").mouseleave(function(){

	var i=$(".pages_pre_hide").length-1;
	fadeOutOrder($(".pages_pre_hide"),i);
	});
//-----------------------------------------------------------------向后翻得按钮
$(".result_box_right .pages_nex_show").mouseenter(function(){

	var i=0;
	fadeInOrder($(".pages_nex_hide"),i);
	alert(objs[i]);
	});
	
$(".result_footer").mouseleave(function(){
	var i=$(".pages_nex_hide").length-1;
	fadeOutOrder($(".pages_nex_hide"),i);
	});

/******************************************************************/
function patch_url(){
	
	
	total_res=$("#res_num").html();
	total_page=Math.ceil(total_res/20);
	if(total_page==0)
		total_page=1;
	if(page>total_page)
		page=total_page;
	
	$(".page_span").html(page+"/"+total_page);//页数
	$(".page_span").animate({fontSize:'24px'},"fast");
	
	lock_butt();
	
	$("td.result_myurl").click(function(){
	
		obj=$(this).parent().next("tr");
		
		if(obj.children("td:first").html()=="")
		{
			changeurl=$(this).html();
			title=$(this).parent().children(".result_title:first").html();
			album=$(this).parent().children(".result_album:first").html();
			artist=$(this).parent().children(".result_artist:first").html();
			musicid=$(this).parent().children(".result_id:first").html();

			$post("MyApp/MusicSearch/patchmusic.php",{
				'action':'patch',
				'url':changeurl,
				'title':title,
				'album':album,
				'artist':artist,
				'musicid':musicid
				},function(result){
					obj.children("td:first").html(result);
					obj.toggle("fast");
			},10);
		}
		else
			obj.toggle("fast");
	});
}

function lock_butt()//绑定点击试和歌词听按钮
{
		
	$(".result_try").click(function(){//绑定试听按钮
		url=$(this).parent().parent().children(".result_myurl:first").html();
		title=$(this).parent().parent().children(".result_title:first").html();
		artist=$(this).parent().parent().children(".result_artist:first").html();
		album=$(this).parent().parent().children(".result_album:first").html();
		musicid=$(this).parent().parent().children(".result_id:first").html();
        
        if(url!="")
        {
            if(url.indexOf("://")==-1)
                url="http://"+url;
            playAudio(url,title,artist,album);
            
            $post("MyApp/MusicSearch/patchmusic.php",{
                'action':'patch',
                'url':url,
                'title':title,
                'album':album,
                'artist':artist,
                'musicid':musicid
            },10);
            
            $(".result_try").attr("src","MyApp/MusicSearch/pause.png");
            
            $(this).attr("src","MyApp/MusicSearch/playing.png");
            $("#music_table").show("fast");
        }
        else
            alert("链接丢失了...");
	});
		
	$(".result_lrc").click(function(){//绑定歌词按钮
		
		$(".result_lrc").attr("src","MyApp/MusicSearch/lrc_none.png");
		$(this).attr("src","MyApp/MusicSearch/lrc.png");
		
		
		lrc_title=$(this).parent().parent().children(".result_title:first").html();
		lrc_artist=$(this).parent().parent().children(".result_artist:first").html();
		
		$(".lrc_show").hide("fast");
		$(".lrc_show").removeClass("lrc_show_mini");
		$(".lrc_show").html("歌词拼命搜索中...<img src='MyApp/MusicSearch/runningcow.gif' />");
		$(".lrc_show").show("fast");
		window.location.href="#lrc_show";

		$post("MyApp/MusicSearch/lrc_search.php",{
			'title':lrc_title,
			'artist':lrc_artist
			},function(result){
				var lrc_temp=new Array();
		
				var lrc_order_temp="";
				lrc_temp=lrcResolver(result);
		
				for(i=0;i<lrc_temp.length;i++)
				{
					if(lrc_temp[i]!=null)
					{
						lrc_order_temp="<p>"+lrc_order_temp+lrc_temp[i]+"</p>";
					}
				}
				if(lrc_temp.length>1)
					the_result_show="<div style='text-align:center;'>"+lrc_order_temp+"</div><hr />"+result;
				else
					the_result_show=result;
					
					
				$(".lrc_show").hide();
				$(".lrc_show").html("<pre>"+the_result_show+"</pre>");
				$(".lrc_show").show("fast");
				window.location.href="#lrc_show";
			});
		});
		
	$(".lrc_show").dblclick(function(){//绑定歌词双击按钮
		$(".lrc_show").hide("fast");
		});
		
	lock_recommend();//绑定试听推荐的按钮

}

//-----------------------------------------------热搜框
function top_search_lock()
{
	$("#top_search_td p").mousedown(function(){
		$("#search_box").val($(this).html());
		});
	$("#search_box").focus(function(){
		$("#top_search_td").slideDown("fast");
		});
	$("#search_box").focusout(function(){
		$("#top_search_td").delay(100).slideUp("fast");
		});
}
//----------------------------------------------随便听听
function rand_play()
{
	$post("MyApp/MusicSearch/randmusic.php",{'type':1,'url':currentFile},function(result){
			var results=JSON.parse(result);
			playAudio(results.url,results.title,results.artist,results.album);
			});
}
$("#rand_checkbox").click(function(){
	stop_recommend_all();
	
	var browser=navigator.appName;//获得浏览器名称
	var b_version=navigator.appVersion;//获得浏览器版本
	var version=b_version.split(";");//分割版本
	var trim_Version=version[1].replace(/[ ]/g,"");//替换内容
	
	if(browser!="Microsoft Internet Explorer"){//判断
		if($("#rand_checkbox").attr("checked"))
		{
			rand_play();
		}
	}
});

$("#next_music").click(function(){//切歌按钮
	if($("#recommend_playall").html()=="取消播放全部" && recommend_list<$(".hotlist_box_music").length)
	{
		var obj=$(".hotlist_box").children(".hotlist_box_music:eq("+recommend_list+")");
		play_recommend(obj);
		recommend_list++;
	}
	else
	{
		stop_recommend_all();
		rand_play();
	}
});

//--------------------------------------------------歌曲收藏按钮
function lock_recommend(){//点击推荐按钮的操作
	$(".recommend").click(function(){
		
		var obj=$(this);
		
		if(obj.attr("src")!="MyApp/MusicSearch/recommended.png")
		{
			url=$(this).parent().parent().children(".result_myurl:first").html();
			title=$(this).parent().parent().children(".result_title:first").html();
			artist=$(this).parent().parent().children(".result_artist:first").html();
			album=$(this).parent().parent().children(".result_album:first").html();
			musicid=$(this).parent().parent().children(".result_id:first").html();
			$post("MyApp/MusicSearch/patchmusic.php",{
				'type':'love',
				'action':'patch',
				'url':url,
				'title':title,
				'album':album,
				'artist':artist,
				'musicid':musicid
				},function(result){
					if(result=="AddLoveOk")
					{
						obj.attr("src","MyApp/MusicSearch/recommended.png");

						or_x=obj.offset().left; 
						or_y=obj.offset().top; 
						
						go_x=$(".recommend_show_butt").offset().left+"px"; 
						go_y=$(".recommend_show_butt").offset().top+"px"; 
						
						obj.css("position","absolute");
						obj.css("left",or_x);
						obj.css("top",or_y);
						
						obj.animate(
						{left:go_x,
						top:go_y},"slow",function(){
							obj.hide("fast",function(){
								
								ex_title="《"+title+"》——";

								var dom="<p class='hotlist_box_music'  style='display:none' num='"+($(".hotlist_box_music").length)+"'>"+ex_title+artist+
								"<span class='recommend_url'>"+url+"</span><span class='recommend_title'>"+title+"</span><span class='recommend_artist'>"+artist+"</span></p>";
								$("#recommend_playall").before(dom);
								$(".hotlist_box_music").show("fast");
								lock_recommend_music();
							
								
								});
							});
						
					}
				});
		}	
	});
	
}
//-----------------------------------推荐列表按钮
function lock_recommend_music()//绑定推荐列表里的歌曲点击事件
{
	$(".hide_hotlist_box").click(function(){$(".hotlist_box").slideUp("fast");});//绑定收起按钮
	
	$(".hotlist_box_music").click(function(){//播放推荐列表里的东西
	recommend_list=$(this).attr("num");
	play_recommend($(this));
	recommend_list++;
	});
	
	$("#recommend_playall").toggle(function(){play_recommend_all();},function(){stop_recommend_all();});//绑定全部播放按钮

}

function get_recommend()//获取推荐列表内容
{
		$post("MyApp/MusicSearch/get_recommend.php",{'type':'recommend'},function(result){
			$(".hotlist_box").html(result);
			lock_recommend_music();
		});
}
$(".recommend_show_butt").click(function(){
	$(".hotlist_box").slideToggle("fast");
	});

function play_recommend(obj){//播放推荐列表里的东西
	
	$(".hotlist_box_music").css("color","#000");
	obj.css("color","#F60");
	var title=obj.children(".recommend_title").html();
	var artist=obj.children(".recommend_artist").html();
	var url=obj.children(".recommend_url").html();
	playAudio(url,title,artist,"");
	}


function play_recommend_all(){
	var oAudio = document.getElementById('myaudio');
	if(oAudio.paused)
	{
		var obj=$(".hotlist_box").children(".hotlist_box_music:eq("+recommend_list+")");	
		play_recommend(obj);
		recommend_list++;
	}		
	
	$("#rand_checkbox").attr("checked",false);
	$("#recommend_playall").html("取消播放全部");
	}
function stop_recommend_all(){
	$("#recommend_playall").html("全部播放");
	$(".hotlist_box_music").css("color","#000");
	}
	
