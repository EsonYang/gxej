$(function() {

    $(".jcarousel-item").delegate("a", "mouseenter", function(e) {
        var target = e.target;
        var type = e.type;
        var srr = this.rel.split(",")[2].split("\'")[1];
        let oBox = $(".jcarousel-item a")
            // console.log(oBox)

        for (let i = 0; i < oBox.length; i++) {
            oBox[i].className = "";
        }
        this.className = "zoomThumbActive";
        $("#prodPicImgId1").attr("src", srr)
        $(".zoomWrapperImage img").attr("src", srr)
    })

    function Biography(url) {
        this.url = url;
        this.init();
        this.getAjax(this.url)
    }
    Biography.prototype = {
        constructor: Biography,
        init() {
            this.a = window.location.href.split("=")[1];
        },
        getAjax(url) {
            $.ajax({
                url: this.url
            }).then(function(res) {
                for (let i in res) {
                    if (res[i].id == this.a) {
                        this.tit(res[i].pro);
                        this.price(res[i].price);
                        this.images(res[i].images);
                        this.shop(res[i].shop);
                    }
                }
            }.bind(this))
        },
        tit(pro) {
            this.proHtml = "";
            $("#tit").html(pro);
            $("title").html(pro)
        },
        price(pri) {
            this.priHtml = "";
            $("#prodPrice").html(pri);
        },
        images(img) {
            this.imgHtml = "";

            $("#prodPicImgId1").attr("src", img);
            $(".zoomWrapperImage img").attr("src", img)
            $(".jcarousel-item-1 img").attr("src", img)
            $(".jcarousel-item-1 a").attr("rel", `{gallery: \'gal1\', smallimage: \'http://img1.ccgn.cc/images/2018/4/27/00042880/1524819038357.jpg-388x388\',largeimage:\'${img}\'}`)
        },
        shop(sho) {
            this.shoHtml = "";
            $(".shopname").html(sho);
        }
    }
    new Biography("data/shoplist.json")

    function Magnifier(options) {
        this.small_ele = $(options.small_ele);
        this.focus_ele = $(options.focus_ele);
        this.big_ele = $(options.big_ele);
        if (this.small_ele.length == 0 || this.focus_ele.length == 0 || this.big_ele.length == 0) return;
        this.init();
    }
    Magnifier.prototype = {
        constructor: Magnifier,
        init() {
            //绑定鼠标移入事件;
            this.scale = 2;
            this.small_ele.on("mouseenter", { hidden: false }, $.proxy(this.toggleFocus, this));
            this.small_ele.on("mouseleave", { hidden: true }, $.proxy(this.toggleFocus, this));
            this.small_ele.on("mousemove.smallMove", $.proxy(this.smallMove, this));
            this.small_ele.on("mousemove.bigMove", $.proxy(this.bigMove, this));
            this.small_ele[0].onmousewheel = function(event) {
                var evt = event || window.event;
            }.bind(this);
            this.small_ele[0].addEventListener("DOMMouseScroll", function(event) {
                this.ratio("ff", event.detail);
            }.bind(this));

        },
        toggleFocus(event) {
            var opacity_img = this.small_ele.find(".opacity-img");

            if (event.data.hidden) {
                this.focus_ele.stop().fadeOut(200);
                this.big_ele.stop().fadeOut(200);
                opacity_img.stop().fadeTo("fast", 1);
            } else {
                this.focus_ele.stop().fadeIn(200);
                this.big_ele.stop().fadeIn(200);
                opacity_img.stop().fadeTo("fast", 0.3);
            }
        },
        smallMove(event) {
            var eleX = event.pageX - this.small_ele.offset().left - this.focus_ele.width() / 2;
            var eleY = event.pageY - this.small_ele.offset().top - this.focus_ele.height() / 2;

            var maxWidth = this.small_ele.width() - this.focus_ele.width();
            var maxHeight = this.small_ele.height() - this.focus_ele.height();

            eleX = eleX <= 0 ? 0 : eleX;
            eleX = eleX >= maxWidth ? maxWidth : eleX;

            eleY = eleY <= 0 ? 0 : eleY;
            eleY = eleY >= maxHeight ? maxHeight : eleY;

            this.focus_ele.css({
                left: eleX,
                top: eleY,
                backgroundPosition: `${-eleX}px ${-eleY}px`
            })

            var fullLongX = this.small_ele.width() - this.focus_ele.width();
            var fullLongY = this.small_ele.height() - this.focus_ele.height();
            this.propX = Math.round(eleX / fullLongX * 100);
            this.propY = Math.round(eleY / fullLongY * 100);
        },
        bigMove() {
            var bigImg = this.big_ele.find("img")
            var fullLongX = bigImg.width() - this.big_ele.width();
            var fullLongY = bigImg.height() - this.big_ele.height();

            var eleX = -Math.round(fullLongX * this.propX / 100);
            var eleY = -Math.round(fullLongY * this.propY / 100);
            bigImg.css({
                left: eleX,
                top: eleY
            })
        }
    }
    new Magnifier({
        small_ele: ".zoomPad",
        focus_ele: ".zoomPup",
        big_ele: ".zoomWindow"
    })


    //数量增加

    //  add(增加)   reduce(减少) 更改num的数量
    function ChangeNum(add, reduce, num) {
        this.add = $(add);
        this.numEle = $(num);
        this.num = parseInt(this.numEle.val());
        this.reduce = $(reduce);
        this.init();
        this.pre();
        this.change();
    }
    ChangeNum.prototype = {
        constructor: ChangeNum,
        init() {
            //增加数量
            this.add.on("click", function() {
                this.num += 1;
                this.numEle.val(this.num);
            }.bind(this))
        },
        pre() {
            //减少数量
            this.reduce.on("click", function() {
                if (this.num <= 1) return;
                this.num -= 1;
                this.numEle.val(this.num);
            }.bind(this))
        },
        change() {
            //改变数量
            this.numEle.on("keyup", function() {
                this.numEle.val(this.numEle.val());

                this.num = parseInt(this.numEle.val());
            }.bind(this))
        }
    }
    new ChangeNum("#plus", "#subtract", "#nums")



    function AddCar() {
        this.shopId = window.location.href.split("=")[1];
        this.main = $("#addTringToShopCardId1");
        this.init();
    }
    AddCar.prototype = {
        constructor: AddCar,
        init() {
            this.main.on("click.addCar", $.proxy(this.Add, this));
            // this.main.on("click.changeNum", $.proxy(this.changeNum, this));
        },
        Add(event) {
            this.goodsNum = $("#nums").val();
            //id获取 ---end;
            //操作cookie存入购物车;
            // [{"id":,"num"}]
            if (!$.cookie("shopCar")) {
                //表示是第一次存数据;
                var shopCarArray = [{
                    id: this.shopId,
                    num: this.goodsNum
                }]
                $.cookie("shopCar", JSON.stringify(shopCarArray))
                return 0;
            }
            //其余次数进行购物车添加;
            //id是否在购物车之中存在;
            var shopCarString = $.cookie("shopCar");
            var shopCarArray = JSON.parse(shopCarString);
            var hasItem = false;
            shopCarArray.forEach(function(item) {
                //如果购物车列表之中有当前项，让商品数量自增就可以了;
                if (item.id == this.shopId) {
                    item.num = Number(item.num)
                    this.goodsNum = Number(this.goodsNum)

                    item.num += this.goodsNum;
                    console.log(item.num)
                    hasItem = true;
                }
            }.bind(this))
            if (!hasItem) {
                // console.log(1)
                var item = {
                    id: this.shopId,
                    num: this.goodsNum
                }
                shopCarArray.push(item)
            }
            $.cookie("shopCar", JSON.stringify(shopCarArray));
            // console.log($.cookie("shopCar"));
        }
    }
    new AddCar()
})