/**
 * Created by admin on 2017/4/15.
 */
(function ($) {
    $("#sameHome").click(function (event) {
        var checked = $(this).prop("checked");
        if (checked) {
            $("#sendAddress").val($("#homeAddress").val());
            $("#sendPhone").val($("#homePhone").val());
        } else {
            $("#sendAddress").val("");
            $("#sendPhone").val("");
        }
        $("#send").find("input:text").setReadOnly(checked);  //或者使用input[type='text']
    });

    /*
     * 如果state为true表示readOnly , 否则表示取消readOnly
     * */
    $.fn.setReadOnly = function (state) {
        //找到所有文本框
        this.filter("input:text").prop("readOnly",state).css("opacity", state ? 0.5 : 1.0);
    };
})(jQuery);