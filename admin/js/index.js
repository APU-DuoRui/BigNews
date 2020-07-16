//(1).声明一个引入函数
$(function () {
    //1.页面刚进来就发送ajax
    $.ajax({
        url: "http://localhost:8080/api/v1/admin/user/info",
        type: "get",
        dataType: "json",
        success: function (backData) {
            //2.响应的页面上
            console.log(backData);
            $('.user_info>img').attr('src', backData.data.userPic);
            $('.user_center_link>img').attr('src', backData.data.userPic);
            $('.user_info>span').text('欢迎', backData.data.nickname);
        }
    })

    //2.点击退出登录
    $('.logout').on('click', function () {
        //2.1删除本地数据
        localStorage.removeItem('token');
        //2.2手动修改跳转页面
        window.location.href = './login.html'
    })
})