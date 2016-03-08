

function lrcResolver(lrc)//返回的是以时间为数组号的数组
{
	var now_lrc=new Array();
	var lrc_row=lrc.split('\n');
	for(var i=0;i<lrc_row.length;i++)
	{
		var temp=lrc_row[i].split("]");//每行歌词文件的时间和歌词分开
		for(var j=0;j<temp.length-1;j++)//从时间得到时间对歌词的映射
		{
			var temp2=temp[j].substring(1,8).split(":");//获取时间
			var lrc_sec=parseInt(temp2[0]*60+temp2[1]*1);
			if(!isNaN(lrc_sec))//if temp2[0]是数字    isNaN是数字则返回false
			{
				now_lrc[lrc_sec]=temp[temp.length-1];//得到歌词  时间作为歌词数组的下标，时间单位是秒
			}
		}
	}
	return now_lrc;
}

function lrc_box_show(){
	$(".head_info").fadeOut("fast",function(){$(".lrc_box_frame").fadeIn("fast");});
	
		
}
function lrc_box_hide(){
	$(".lrc_box_frame").fadeOut("fast",function(){$(".head_info").fadeIn("fast");});
	
}