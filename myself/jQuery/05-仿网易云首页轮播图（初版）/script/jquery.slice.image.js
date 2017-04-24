(function($){
    /**
     *基于btnList的插件，触发按钮实现相应的效果
     *应该作为包装集的插件
     */
    $.fn.imgSlice = function (options) {
        /*传入需要的键值对，初始化默认值*/
        var setting = $.extend({
            imgElement: ["#imgShowLeft","#imgShowCenter","#imgShowRight"],
            prev: "#prev",
            next: "#next",
            current: 0
        },options || {});

        var lis = this;

        /*为每一个li设定相应的数值，以此可以在showImg通过下标访问*/
        lis.each(function (n) {
            $(this).data("img-number",n);
        });
        
        function showImg(index) {
            /*在执行之后取消上一次的事件*/
            /**/
            if (index < 0) index = lis.length - 1;
            if (index >= lis.length) index = 0;

            $(setting.imgElement[0]).attr("src",$(lis[index-1]).find("img").attr("src") || $(lis[lis.length-1]).find("img").attr("src"));
            $(setting.imgElement[1]).attr("src",$(lis[index]).find("img").attr("src"));
            $(setting.imgElement[2]).attr("src",$(lis[index+1]).find("img").attr("src") || $(lis[0]).find("img").attr("src"));
            /*设置li元素的颜色，并使被选中元素的同胞元素显示默认颜色*/
            $(lis[index]).css("borderColor","#f00").siblings().css("borderColor","#bbb");

            setting.current = index;
        }

        /*事件处理*/
        lis.on('mouseover',function (event) {
            showImg($(this).data("img-number"));
        });
        $(setting.prev).on('click',function (event) {showImg(setting.current - 1)});
        $(setting.next).on('click',function (event) {showImg(setting.current + 1)});

        /*初始界面*/
        showImg(0);
        return this;
    }


})(jQuery);