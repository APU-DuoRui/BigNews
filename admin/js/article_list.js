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
        //2.2调用一下根据文章请求
        getArticleList(1);
    })
    //2.3页面一加载就触发ajax请求
    $("#btnSearch").trigger("click");

    //3.封装根据文章2请求
    function getArticleList(currentPage) {
        $.ajax({
            url: BigNew.article_query,
            type: "get",
            dataType: "json",
            data: {
                type: $("#selCategory").val(),
                state: $("#selStatus").val(),
                //页码
                page: currentPage,
                //请求的次数
                perpage: 10,
            },
            success: function (backData) {
                console.log(backData);
                //2.3渲染模板上
                $("table>tbody").html(template("filtrate_list", backData));
                //2.4调用一下根据分类查询
                loadPageination(backData.data.totalPage, currentPage)
            }
        })
    }

    /**4.分页查询
     * @description :  加载分页组件
     * @param {type}:  totalPage : 总页码 
     * @param {type}:  startPage : 当前页数 
     * @return: 
     */
    //4.1封装一个函数 (分类查询)
    function loadPageination(totalPage, startPage) {
        //4.1(1)先销毁上一次分页数据
        $("#pagination").twbsPagination("destroy")
        //4.1(2)加载分页插件
        $("#pagination").twbsPagination({
            //4.1(3)总页数
            totalPages: totalPage,
            //4.1(4)用户可以看见的页码
            startPage: startPage,
            //4.1(5)
            visiblePages: 7,
            first: "上一页",
            prev: "上一页",
            next: "下一页",
            last: "尾页",
            onPageClick: function (event, page) {
                //4.1(6)如果点击的页数与当前页数不一致则发送ajax请求
                if (page != startPage) {
                    //4.1(7)调用一下(页数请求文章列表)
                    getArticleList(page);
                }
            }
        })
    }

    //5.点击删除 因为这里是动态生成需要委托注册 点击
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
