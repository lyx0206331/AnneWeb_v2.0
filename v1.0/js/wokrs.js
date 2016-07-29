$(function () {
    var $wd = $(window),
        $img = $('img'),
        imgTop,          //图片距离顶部高度
        scTop,             //滚动条高度
        wH;           //窗口高度
    wH = $wd.height();         //获得可视浏览器的高度
    $wd.scroll(function () {
        scTop = $wd.scrollTop();       //获取滚动条到顶部的垂直高度
        $img.each(function () {
            imgTop = $(this).offset().top;
            if (imgTop - wH < scTop &&     //图片必须出现在窗口底部上面
                imgTop - wH > 0 &&        //排除首页图片
                $(this).attr('src') != $(this).data('url')) {          //排除已经加载过的图片
                $(this).attr({
                    src: $(this).data('url')
                });
            }
        });
    });
});


function CloseWebPage() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null;
            window.close();
        } else {
            window.open('', '_top');
            window.top.close();
        }
    }
    else if (navigator.userAgent.indexOf("Firefox") > 0) {
        window.location.href = 'about:blank ';
    } else {
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
}


//scrolltotop
$(function () {
    //首先将#back-to-top隐藏
    $("#allxf").hide();
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 1100) {
                $("#allxf").fadeIn();
            }
            else {
                $("#allxf").fadeOut();
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $("#totop").click(function () {
            $('body,html').animate({scrollTop: 0}, 500);
            return false;
        });
    });
}); 