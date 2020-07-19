//1.声明一个入口函数
$(function () {
    //1.页面一加载就发送ajax请求
    $.ajax({
        url: BigNew.category_list,
        type: "get",
        dataType: "json",
        success: function (backData) {
            console.log(backData);
            //2.显示到模板上
            $('.category_table>tbody').html(template("article", backData))
        }
    })
    //需求2 模态框出现之前
    $('#myModal').on('show.bs.modal', function (e) {
        //2.1获取模态框事件触发源 (相关的目标)
        console.log(e.relatedTarget);
        var target = $(e.relatedTarget);
        //2.2执行模态框新建分类逻辑
        if (target.text() == "新增分类") {
            //执行新增成功分类逻辑
            //(1)设置按钮文本为新增成功
            $(".btn-confirm").text('新增');
        } else {
            //执行编辑分类文本为
            //(1)设置按钮文本为编逻
            $('.btn-confirm').text('编辑');
            //(2)取出当前按钮所在按钮的tr的name值赋值给模态框的表单
            $('#recipient-name').val(target.parent().prev().prev().text())
            //(3)取出当前按钮所在的tr的slug赋值给模态框的表单
            $('#message-text').val(target.parent().prev().text());
            //(4)取出当前按钮所在的自定义属性data-id赋值给模态框编辑按钮的自定义属性data-id
            $('.btn-confirm').attr('data-id', target.attr('data-id'));
        }
    });

    //2.取消按钮点击事件
    $('.btn-cancel').on('click', function (e) {
        //2.1清空文本框数据  : 这个 DOM原生的方法
        $('#form')[0].reset();
        //2.2隐藏模态框
        $('#myModal').modal('hied');
    });
    //3确认按钮点击事件
    $('.btn-confirm').on('click', function (e, a) {
        //3.1判断是不是当前点击
        if ($(this).text() == "新增") {
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: "json",
                data: {
                    name: $("#recipient-name").val(),
                    slug: $("#message-text").val(),
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 201) {
                        alert("新增成功");
                        window.location.reload();
                    } else {
                        // 服务器返回的数据可以显示任何错误
                        alert(backData.msg);
                    }
                }
            });


        } else {
            //4 .编辑 
            $.ajax({
                url: BigNew.category_edit,
                type: "post",
                dataType: "json",
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val(),
                    id: $(this).attr('data-id'),
                },
                success: function (backData) {
                    console.log(backData);
                    //判断是不是服务器返回的正确的数据
                    if (backData.code == 200) {
                        alert('编辑成功');
                        //登录成功就刷新页面
                        window.location.reload();
                    } else {
                        alert(backData.msg);
                    }
                }
            })
        }
    })
    //4删除按钮  注意点这里是数据委托注册
    $('table>tbody').on('click', ".btn-delete", function () {
        //4.发送ajax请求
        $.ajax({
            url: BigNew.category_delete,
            type: "post",
            dataType: "json",
            data: {
                id: $(this).attr('data-id'),
            },
            success: function (backData) {
                console.log(backData);
                //4.2判断是不是204
                if (backData.code == 204) {
                    alert('删除成功');
                    window.location.reload();
                } else {
                    alert(backData.msg);
                }
            }
        })
    })

})