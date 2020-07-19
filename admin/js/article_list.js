//(1).声明一个入函数
$(function () {
    //1.页面一加载就发送ajax请求
    $.ajax({
        url: BigNew.category_list,
        type: "get",
        dataType: "json",
        success: function (backData) {
            console.log(backData);
            //2.渲染在模板上
            $("#selCategory").html(template('atc_list', backData))
        }
    })

    //2.点击筛选按钮 触发ajax请求 这里可以调用多次 
    $("#btnSearch").on("click", function (e) {
        //2.1阻止默认跳转事件
        e.preventDefault();
        //2.2发送ajax请求
        $.ajax({
            url: BigNew.article_query,
            type: "get",
            dataType: "json",
            data: {
                type: $("#selCategory").val(),
                state: $("#selStatus").val(),
                //页码
                page: 1,
                //请求的次数
                perpage: 10,
            },
            success: function (backData) {
                console.log(backData);
                //2.3渲染模板上
                $("table>tbody").html(template("filtrate_list", backData));
            }
        })
    })
    //2.3页面一加载就发送ajax请求
    $("#btnSearch").click();

    //3.分页


    //4.点击删除 因为这里是动态生成需要委托注册 点击
    $("table>tbody").on("click", function (e) {
        //4.1阻止默认事件
        e.preventDefault();
        //4.2发送ajax请求
        $.ajax({
            url: BigNew.article_query,
            type: "get",
            dataType: "json",
            data: {
                //获取当前列表的数据
                type: $("#selCategory").val(),
                state: $("#selStatus").val(),
                //页码
                page: 1,
                perpage: 10,

            },
            success: function (backData) {
                console.log(backData);
                //渲染到模板上
                $("table>tbody").html(template("filtrate_list", backData))
            }
        })
    })


    //5.分页

    //6.删除 这里是动态生成 需要委托注册事件
    $("table>tbody").on("click", ".delete", function () {
        //发送ajax请求 
        $.ajax({
            url: BigNew.article_delete,
            type: "post",
            dataType: "json",
            data: {
                id: $(this).attr("data-id")
            },
            success: function (backData) {
                console.log(backData);
                //判断是不是204
                if (backData.code == 204) {
                    //提示用户删除成功
                    alert("成功删除");
                    //刷新页面
                    window.location.reload()
                } else {
                    //删除失败提示用户
                    alert(backData.msg)
                }
            }
        })
    })


})
