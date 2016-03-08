function $post(url,data,events,try_times){
	if(try_times==null)
		var try_times=10;
	if(try_times>0)
	{
		var obj=$.post(url,data,events);
		try_times--;//次数减一
		obj.complete(function(){
			obj.error(function(){
				$post(url,data,events,try_times);
			});
		});
	}
}
