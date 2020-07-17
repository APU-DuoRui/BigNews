//1.声明一个入口函数
$(function () {
    //1.获取artile_list页面传过来的文章id
    var id = window.location.href.split("=")[1];
    console.log(id);

    //2.加载文章类别
    $.ajax({
        url: BigNew.category_list,
        type: "get",
        dataType: "json",
        success: function (backData) {
            console.log(backData);
            //2.1判断是不是200
            if (backData.code == 200) {
                //2.2模板渲染数据
                $('select.category').html(template('cat_list', backData))
            }
        }
    })
})