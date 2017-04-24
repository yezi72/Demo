/**
 * Created by admin on 2017/4/15.
 */
(function ($) {
    $.fixedTopicWidth = function (str,options) {
        //传入设置参数值
        var setting = $.extend({
            length: 50,
            fill: null,
            fillLength: 3
        },options || {});
        var pos = setting.length - str.length;

        if (pos > 0) {
            return str;
        } else {
            if (setting.fill) {
                var fs = "";
                for (var i = 0; i < setting.fillLength; i++) {
                    fs += setting.fill;
                }
                return (str.substr(0,setting.length - 3) + fs);
            } else {
                return str.substr(0,setting.length);
            }
        }
    };

    //jquery中不建议使用$.prototype.xx 来表达原型，而是采用$.fn.xx的方式
    $.fn.setColor = function () {
        //此时的this是整个包装集对象，已经被封装为包装集
        //就不用再使用$(this)进行封装
        this.css("color","#555");
        //基于包装集的函数一定要能够支持链式结构
        return this;
    };

    $.fn.formatTopic = function (options) {
        this.each(function (n) {
            //此时的this不是包装集对象，而是这个闭包对象
            //此时闭包中的引用是一个html节点，要访问就需要使用$(this)
           $(this).html($.fixedTopicWidth($(this).html(), options));
        });
    };
})(jQuery);


