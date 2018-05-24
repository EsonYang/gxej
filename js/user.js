 $(function() {
     if ($.cookie("user") != "null" && $.cookie("user")) {
         var usn = $.cookie("user").split("\"")[1]
         var html = `Hi , [<span id="titleUserName" class="tnm2 " >${usn}</span>]<a id="remUser" href="javascript:;" target="_parent">退出</a>`
         $("#uesr_info").html(html);
         $("#zc").html("")
     } else {
         var html2 = `<a href="land.html" class="a_color">马上登录</a>`
         $("#uesr_info").html(html2);
         var zc = `<a href="register.html" class="a_color">注册</a>`
         $("#zc").html(zc)

     }
     $("#remUser").on("click", function() {
         $.cookie("user", null);
         window.location.reload();
     })

 })