$(function() {
    function User_reg() {
        this.phoneScss = false;
        this.pwdScss = false;
        this.rpwdScss = false;
        this.validateScss = false;
        this.init()
    }
    User_reg.prototype = {
        constructor: User_reg,
        init() {
            $("#mobile").on("blur", function() {
                this.verification();
                this.phoneblur_error();
            }.bind(this))
            $("#safeEdit1").on("blur", function() {
                this.verification();
                this.safeEdit1_error();
            }.bind(this))
            $("#safeEdit2").on("blur", function() {
                this.verification();
                this.safeEdit2_error();
            }.bind(this))
            $("#validateCode").on("blur", function() {
                this.verification();
                this.validateCode_error();
            }.bind(this))
            $("#button_step1").on("click", function() {
                this.click_error();

            }.bind(this))
        },
        verification() {
            var Validator = (function() {
                var rules = {
                    notEmpty: function(val) {
                        return val != "" && val != null && val != undefined;
                    },
                    lengthRange: function(val, args) {
                        var [min, max] = [args.split(",")[0], args.split(",")[1]];
                        return val.length >= min && val.length <= max;
                    },
                    phone: function(val) {
                        return /^(1[35][01235678]|18[012356789])\d{8}$/.test(val);
                    },
                    password: function(val) {
                        return /^[a-z0-9\u0021-\u002f]{6,20}$/i.test(val);
                    },
                    validate: function(val) {
                        return /^[0-9a-zA-Z]{4}$/.test(val);
                    }
                }
                return {
                    check: function(val, sets) {
                        return sets.every(function(rulename) {
                            return rules[rulename.split("\|")[0]](val, rulename.split("\|")[1]);
                        });
                    }
                };
            }());
            this.phoneEmpty = Validator.check($("#mobile").val(), ["notEmpty"]);
            this.phoneError = Validator.check($("#mobile").val(), ["phone"]);
            this.pwdEmpty = Validator.check($("#safeEdit1").val(), ["notEmpty"]);
            this.pwdError = Validator.check($("#safeEdit1").val(), ["password"]);
            this.rpwdEmpty = Validator.check($("#safeEdit2").val(), ["notEmpty"]);
            this.Verification = Validator.check($("#validateCode").val(), ["validate"]);

            if (this.phoneEmpty && this.phoneError && this.pwdEmpty && this.pwdError && this.rpwdEmpty && ($("#safeEdit1").val() == $("#safeEdit2").val())) {
                this.succ = true;
            }
        },
        phoneblur_error: function() {
            if (this.phoneEmpty) {
                if (!this.phoneError) {
                    console.log("错误")
                    $("#mobile").addClass("txt2-t1")
                    $("#mobileErrorIcon").addClass("icon_error_r1");
                    $("#mobilemsg").css("color", "red").html("请输入正确的手机号")

                } else {
                    console.log("成功")
                    $("#mobileErrorIcon").removeClass("icon_error_r1");
                    $("#mobilemsg").css("color", "red").html("")
                    $("#mobileErrorMsg").addClass("icon_success_r1")
                    $("#mobile").removeClass("txt2-t1").addClass("txt2-t4")
                    this.phoneScss = true;

                }
            } else {
                $("#mobile").addClass("txt2-t1")
                $("#mobileErrorIcon").addClass("icon_error_r1");
                $("#mobilemsg").css("color", "red").html("不能为空")
            }
        },
        safeEdit1_error: function() {
            if (this.pwdEmpty) {
                if (!this.pwdError) {
                    $("#password").addClass("txt2-t1")
                    $("#custpwdErrorIcon").addClass("icon_error_r1");
                    $("#custpwdmsg").css("color", "red").html("密码长度为8到30位")

                } else {
                    $("#custpwdErrorIcon").removeClass("icon_error_r1");
                    $("#custpwdmsg").css("color", "red").html("")
                    $("#custpwdErrorMsg").addClass("icon_success_r1")
                    $("#password").removeClass("txt2-t1").addClass("txt2-t4")

                    this.pwdScss = true;
                }
            } else {
                $("#password").addClass("txt2-t1")
                $("#custpwdErrorIcon").addClass("icon_error_r1");
                $("#custpwdmsg").css("color", "red").html("不能为空")
            }

        },
        safeEdit2_error() {
            if (this.pwdEmpty && $("#safeEdit1").val() == $("#safeEdit2").val()) {
                console.log("成功")
                $("#custpwd1ErrorMsg").addClass("icon_success_r1")
                $("#custpwd1msg").css("color", "red").html("")
                $("#custpwd1ErrorIcon").removeClass("icon_error_r1");
                $("#safeEdit2").removeClass("txt2-t1").addClass("txt2-t4")



                this.rpwdScss = true;
            } else {
                $("#safeEdit2").addClass("txt2-t1")
                $("#custpwd1ErrorIcon").addClass("icon_error_r1");
                $("#custpwd1msg").css("color", "red").html("两次密码不一致")
            }
        },
        validateCode_error() {
            if (this.Verification) {
                $("#checkCodeErrorMsg").addClass("icon_success_r1")
                $("#validateCode").removeClass("txt2-t1")
                $("#checkCodeMsg").css("color", "red").html("")
                $("#checkCodeErrorIcon").removeClass("icon_error_r1");
                this.validateScss = true;
            } else {
                $("#validateCode").addClass("txt2-t1")
                $("#checkCodeErrorIcon").addClass("icon_error_r1");
                $("#checkCodeMsg").css("color", "red").html("验证码不能为空")
            }
        },
        click_error: function() {
            if (this.phoneScss && this.pwdScss && this.rpwdScss && this.validateScss) {
                if ($('#agreement').is(':checked')) {
                    this.submitData()
                    $("#content").css({ "height": "35px", "overflow": "hidden" })
                    $("#step_r_4").css("display", "block")
                }
            } else {
                alert("请确认后再进行注册")
            }
        },
        submitData() {

            console.log(1)
                //把登陆信息交给后台验证;
            var uname = $("#mobile").val();
            var pwd = $("#safeEdit1").val();
            var opt = {
                url: "http://localhost:8081/gxej/user.php",
                type: "POST",
                data: {
                    username: uname,
                    password: pwd,
                    type: "register"
                }
            }
            $.ajax(opt)
                .then(function(res) {
                    console.log(res);
                })
        }
    }
    new User_reg()
})