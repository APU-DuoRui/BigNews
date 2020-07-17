//(1).声明一个引入函数
$(function () {
    //1.给按钮注册点击事件
    $('.input_sub').on('click', function (e) {
        //2.阻止默认跳转事件
        e.preventDefault();
        //2.1获取用户输入账号和密码
        var username = $(".input_txt").val().trim();
        var password = $(".input_pass").val().trim();
        //3.非空判断
        if (username == '' || password == '') {
            $('.modal-body>p').text("输入有误");
            $('#myModal').modal({ keyboard: true });
            return;
        } else {
            //4.发送ajax求请
            $.ajax({
                url: BigNew.user_login,
                type: "post",
                dataType: "json",
                header: {
                    "Authorization": localStorage.getItem('token')
                },
                data: {
                    username: username,
                    password: password,
                },
                success: function (backData) {
                    console.log(backData);
                    //5.跳转页面
                    if (backData.code == 200) {
                        $('.modal-body>p').text("登录成功");
                        $('#myModal').modal({ keyboard: true });
                        $('#myModal').on('hidden.bs.modal', function (e) {
                            //5.1将token存入本地数据
                            localStorage.setItem("token", backData.token);
                            window.location.href = "./index.html";
                        })
                    } else {
                        //5.2如果密码和账号错误会提示提示用户
                        $('#myModal').modal({ keyboard: true });
                        $('.modal-body>p').text(backData.msg)
                    }
                }
            })
        }
    })
})