(function($){
	/*基于thumbnails列表的插件，点击列表的图片时实现相应的效果
	* 应该作为包装集的插件
	* */
	$.fn.movieSlice = function(options){
	    /*传入需要的键值对，初始化默认值*/
		var setting = $.extend({
			movieElement:"#movieElement",
			next:"#nextMovie",
			prev:"#prevMovie",
			first:"#firstMovie",
			last:"#lastMovie",
			/*路径替换函数*/
			replacePath:function(str,path) {
				if(path) {
					return str.replace(/thumbnail/,path); //把路径thumbnail替换成path
				} else {
					return str.replace(/thumbnail/,"movie"); //默认路径为“movie”
				}
			}
		},options||{});
		var thumbnails = this;
		/**
		 * 为每一个缩略图设定相应的数据，以此可以在showPhoto通过下标访问
		 */
		thumbnails.each(function(n){
			$(this).data("photo-number",n);
		});
		setting.cur = 0;
		this.on("click",function(event){
			showPhoto($(this).data("photo-number"));
		});
		$(setting.movieElement).on("click",function(){
			showPhoto(setting.cur+1);
		});
		$(setting.prev).on("click",function(){showPhoto(setting.cur-1)});
		$(setting.next).on("click",function(){showPhoto(setting.cur+1)});
		$(setting.first).on("click",function(){showPhoto(0)});
		$(setting.last).on("click",function(){showPhoto(thumbnails.length-1)});
		
		function showPhoto(index) {
			//可以在点击之后取消click
			$(setting.movieElement).off("click");
			if(index<0) index = thumbnails.length-1;
			if(index>=thumbnails.length) index=0;
			$(setting.movieElement)
				.attr("src",setting.replacePath(thumbnails[index].src))
				.css("opacity","0.0").animate({opacity:1.0},1000,function(){
					//当动画加载完毕之后，开启click
					$(setting.movieElement).on("click",function(){
						showPhoto(setting.cur+1);
					});
				});
			setting.cur = index;
		}
		showPhoto(0);
		return this;
	};
})(jQuery);
