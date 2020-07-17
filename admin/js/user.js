//1.声明入口函数
$(function () {
    //1.1页面一加载就获取用户信息
    $.ajax({
        url: BigNew.user_detail,
        type: "get",
        dataType: "json",
        success: function (backData) {
            console.log(backData);
            //1.1显示再页面上
            $(".user_pic").attr("src", backData.data.user_pic);
            $('.username').val(backData.data.username);
            $('.nickname').val(backData.data.nickname);
            $('.email').val(backData.data.email);
            $('.password').val(backData.data.password);
        }
    })

    //1.2上传文件
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });
    //2.如果用户想修改就发送ajax请求
    $('#form').on('submit', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('form')[0])
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                //2.1返回页面在页面显示
                if (backData.code == 200) {
                    alert("修改成功");
                    //2.2修改成功之后刷新页面
                    window.parent.location.reload();
                } else {
                    alert(backData.msg)
                }
            }
        });
    });

})