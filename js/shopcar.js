$(function() {
    function ShowCar() {
        this.html = "";
        if (!!($.cookie("shopCar"))) {
            $("#form_allstore").show();
            this.init();
        } else {
            $("#empty").css("display", "block");
            $("#form_allstore").hide();
        }


    }
    ShowCar.prototype = {
        constructor: ShowCar,
        init() {
            this.getJson();
            this.cooArry = JSON.parse($.cookie("shopCar"));
            this.oBox = $(".order-content")
            this.oBox.on("click.reduce", "a[reduce-id]", $.proxy(this.reduce, this));
            this.oBox.on("click.addNum", "a[addShopNum-id]", $.proxy(this.addNUm, this));
            this.oBox.on("blur.changeNum", "input[change-id]", $.proxy(this.changeNum, this));
            $("#Yh-checkbox").on("click", $.proxy(this.checkAll, this));
            this.oBox.on("click", "input[name]", $.proxy(this.check, this));
            this.oBox.on("click", "a[dele-id]", $.proxy(this.dele, this));

        },
        getJson() {
            $.ajax({ url: "./data/shoplist.json" })
                .then(function(res) {
                    res.forEach(function(item) {
                            this.cooArry.forEach(function(res) {
                                if (res.id == item.id) {
                                    this.rend(item, res.num)
                                }

                            }.bind(this))
                        }.bind(this))
                        // this.total();
                }.bind(this));
        },
        rend(data, num) {
            this.html += ` <div data-id="${data.id}" class="item-holder">
                                    <div id="" class="item-body clear ">
                                        <!--商品复选框-->
                                        <div class="td-inner td-chk td-innerCon">
                                            <div class="cart-checkbox " style="margin-top: 2px;">
                                                <input type="checkbox" name="checked_goods" class="check">
                                                <label for="" class=""></label>
                                            </div>
                                        </div>

                                        <ul class="item-content  clear">
                                            <!--商品图片、名称、SKU-->
                                            <li class="td td-item" style="word-break: break-all;">
                                                <div class="td-innerCon clear">
                                                    <div class="item-pic fl">
                                                        <a href="" target="_blank">
                                                            <img src="${data.images}"></a>
                                                    </div>
                                                    <div class="item-info fl">
                                                        <div class="item-basic-info">
                                                            <a href="details.html?id=${data.id}" target="_blank" class="item-title" title="">${data.pro}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <!--商品规格-->
                                            <li class="td th-info">
                                                <div class="td-innerCon clear">
                                                    <div class="item-info">
                                                        <div class="info-line">
                                                            <em style="font-size: 12px;" title=""></em>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <!--商品价格-->
                                            <li class="td th-price">
                                                <div class="price-content td-innerCon">
                                                    <div class="price-line">
                                                        <em  style="font-size: 13px;">￥${data.price}</em>
                                                    </div>
                                                    <!-- 如果有团购 的原价-->
                                                </div>
                                            </li>

                                            <!--商品数量-->
                                            <li class="td td-amount">
                                                <div class="td-innerCon">
                                                    <div class="item-amount clear">
                                                        <a href="javascript:void(0)" price="${data.price}" shopName="${data.id}" class="fl tac amount-color minus" reduce-id="${data.id}" >-</a>
                                                        <input prodsta="nomal" price="${data.price}" shopName="${data.id}" onkeyup="value=value.replace(/[^\\d]/g,'')" type="text" change-id="${data.id}" class="fl tac f14  text text-amount" value="${num}">
                                                        <a href="javascript:void(0)" price="${data.price}" shopName="${data.id}" class="fl tac f14 amount-color plus" addShopNum-id="${data.id}" >+</a>
                                                    </div>
                                                    <!-- 限购 -->

                                                </div>
                                            </li>
                                            <!--优惠-->

                                            <!-- 价格小计 -->
                                            <li class="td td-sum">
                                                <div class="td-innerCon">
                                                    <span style="font-size: 14px;font-weight: normal;">￥</span><em shop_price="${data.id}" id="${data.id}">${parseInt(Math.ceil(data.price * num * 100)) / 100}</em>
                                                </div>
                                            </li>
                                            <!--删除与收藏-->
                                            <li class="td td-top">
                                                <div class="td-innerCon">
                                                    <a href="javascript:void(0)" dele-id="${data.id}" >删除</a>
                                                    <a href="javascript:void(0)"></a>
                                                    <a href="javascript:void(0)" title="移入关注" class="btn-shou">移入关注</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>`
            $(".order-content ").html(this.html);
        },
        reduce(event) {
            var target = event.target || event.srcElement;
            var reduceID = $(target).attr("reduce-id");
            var shopNumber = $(target).next("input").val();
            shopNumber--;
            if (shopNumber <= 0) {
                shopNumber = 1;
            }
            $(target).next("input").val(shopNumber);
            this.cooArry.forEach(function(res) {
                if (res.id == reduceID) {
                    res.num = shopNumber;
                }
                $.cookie("shopCar", JSON.stringify(this.cooArry));
            }.bind(this))
            this.changePrice(target, shopNumber)
                // this.total();
        },
        addNUm(event) {
            var target = event.target || event.srcElement;
            var addID = $(target).attr("addshopnum-id");
            var shopNumber = $(target).prev("input").val();
            shopNumber++;
            $(target).prev("input").val(shopNumber);
            this.cooArry.forEach(function(res) {
                if (res.id == addID) {
                    res.num = shopNumber;
                }
                $.cookie("shopCar", JSON.stringify(this.cooArry));
            }.bind(this))
            this.changePrice(target, shopNumber)
                // this.total();

        },
        changeNum(event) {
            var target = event.target || event.srcElement;
            var changeID = $(target).attr("change-id");
            var shopNumber = $(target).val();
            this.cooArry.forEach(function(res) {
                if (res.id == changeID) {
                    res.num = shopNumber;
                }
                $.cookie("shopCar", JSON.stringify(this.cooArry));
            }.bind(this))
            this.changePrice(target, shopNumber)
                // this.total();
        },
        changePrice(target, num) {
            var target = event.target || event.srcElement;
            var shopPrice = $(target).attr("price");
            var shopaaaa = $(target).attr("shopName");
            var allPrice = parseInt(Math.ceil(shopPrice * num * 100)) / 100

            $("#" + shopaaaa).html(allPrice);
            return allPrice;
        },
        check(event) {
            var target = event.target || event.srcElement;
            var isCheck = $(target).is(":checked")
                // console.log(isCheck)
            var checkPrice = $(target).parents(".item-holder").find("em[shop_price]").html()
                // console.log(checkPrice)
            var checkLg = $("input[class='check']").not("input:checked").length;
            $("input[class='check']").change(function() {
                // console.log(typeof(this.shopCheck))
                if (isCheck == true) {
                    this.shopCheck += parseInt(checkPrice * 100) / 100;
                    this.shopCheck = parseInt(this.shopCheck * 100) / 100

                } else {
                    // this.shopCheck = $("#cart_totalPay").html();

                    this.shopCheck -= parseInt(checkPrice * 100) / 100;
                    this.shopCheck = parseInt(this.shopCheck * 100) / 100

                }
                console.log(this.shopCheck)
                $("#cart_totalPay").html(this.shopCheck);
                $("#cart_totalPayDec").html(this.shopCheck);

                if (checkLg <= 0) {
                    $("#Yh-checkbox").prop("checked", true);
                } else {
                    $("#Yh-checkbox").prop("checked", false);
                }
                // return this.shopCheck
            }.bind(this))
        },
        checkAll() {
            if ($("#Yh-checkbox").is(":checked") == true) {
                $("input[class='check']").prop('checked', true);
                this.total();
            } else {
                $("input[class='check']").prop('checked', false);
                $("#cart_totalPay").html("0.00");
                $("#cart_totalPayDec").html("0.00");
            }
            console.log($(".item-holder").length)

        },
        dele(event) {
            var target = event.target || event.srcElement;
            var delId = $(target).attr("dele-id");
            $(target).parents(".item-holder").remove();
            this.cooArry.forEach(function(item) {
                if (delId == item.id) {
                    this.cooArry.splice($.inArray(item, this.cooArry), 1);
                    $.cookie("shopCar", JSON.stringify(this.cooArry));
                    return 0
                }
            }.bind(this))
            if ($(".item-holder").length <= 0) {
                // $.cookie("shopCar", )
                $("#empty").css("display", "block")
                $("#form_allstore").hide();
                $.cookie('shopCar', '', { expires: -1 });
                this.getJson();

            }
            // this.total();
        },
        total() {
            this.shopAllPrice = 0;
            var prilg = $("em[shop_price]").length;
            for (let i = 0; i < prilg; i++) {
                this.shopAllPrice += parseInt($($("em[shop_price]")[i]).html() * 100) / 100;
            }
            $("#cart_totalPay").html(this.shopAllPrice);
            $("#cart_totalPayDec").html(this.shopAllPrice);
        }
    }
    new ShowCar();
})