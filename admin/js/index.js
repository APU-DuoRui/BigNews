//(1).声明一个引入函数
$(function () {
    //1.页面刚进来就发送ajax
    $.ajax({
        url: BigNew.user_info,
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
    //3.鼠标点击谁, 当前的样式修改样式
    $('.level01').on('click', function () {
        $(this).addClass("active").siblings().removeClass("active");
        if ($(this).index() == 1) {
            //3.1点击(slideToggle)依次展开或卷起某个元素
            $('.level02').slideToggle();
            //3.2切换类名 后代选择器 判断有没有这个类名 
            $(this).find("b").toggleClass("rotate0");
            //3.3点击level02触发 level02的ul>li>a默选择第一个a
            $('.level02>li:eq(0) a')[0].click();
        } else {
            $('.level02>li').removeClass('active');
        }
    })
    //4.点击level02的a标签变颜色
    $('.user_center_link>a').on('click', function () {
        $("#user").addClass('active').siblings().removeClass('active');
    })
    //5.点击level02的a变颜色
    $('.level02>li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
})