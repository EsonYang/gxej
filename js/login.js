$("#button").on("click", function() {
    //把登陆信息交给后台验证;
    var username = $("#username").val();
    var pwd = $("#password").val();
    var opt = {
        url: "http://localhost:8081/gxej/user.php",
        type: "POST",
        data: {
            username: username,
            password: pwd,
            type: "login"
        }
    }
    $.ajax(opt)
        .then(function(res) {
            // console.log(res);
            if (res == 0) {
                $("#msg").css("display", "block")
            } else {
                var us = res.split(",")[0].split(":")[1]
                $.cookie("user", us, { expires: 7 })
                window.location.href = "index.html";
            }
        })
})