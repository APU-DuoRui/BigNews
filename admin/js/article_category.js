//1.声明一个入口函数
$(function () {
    //1.页面一加载就发送ajax请求
    $.ajax({
        url: BigNew.user_detail,
        type: "get",
        dataType: "json",
        success: function (backData) {
            console.log(backData);
        }
    })
    //2.显示到页面上

})