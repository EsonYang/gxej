//鼠标划入显示及隐藏
function Show(ele, showEle) {
    if (!!showEle) {
        //鼠标划入ele后showEle显示及隐藏
        this.oBox = $(ele);
        this.showEle = $(showEle)[0];
        this.listShow();
    } else {
        //ele下面的div显示及隐藏
        this.oBox = $(ele);
        this.mouseShow = $(ele + "> div");
        this.init();
    }
}
Show.prototype = {
    constructor: Show,
    init() {
        for (let i = 0; i < this.oBox.length; i++) {
            this.oBox[i].onmouseenter = function() {
                this.mouseShow[i].style.cssText = "display:block";
            }.bind(this);
            this.oBox[i].onmouseleave = function() {
                this.mouseShow[i].style.cssText = "display:none";
            }.bind(this);
        }
    },
    listShow() {
        //console.log(this.showEle)
        this.oBox[0].onmouseenter = function() {
            this.showEle.style.cssText = "display:block";
        }.bind(this)
        this.oBox[0].onmouseleave = function() {
            this.showEle.style.cssText = "display:none";
        }.bind(this)
    }
}
new Show("._oBox");

$(function() {
    //吸顶    ele为要吸顶的部分   className为吸顶后的class名
    function SuctionTop(ele, className) {
        this.className = className;
        this.ele = $(ele);
        this.init();
        this.constider()
        this.offTop = this.ele.offsetTop;
    }
    SuctionTop.prototype = {
        constructor: SuctionTop,
        init() {
            $(document).on("scroll", $.proxy(this.constider, this))
        },
        constider() {
            // console.log(this.ele)
            this.scrTop = $("html").scrollTop();
            //console.log(this.scrTop, this.offTop)
            if (this.scrTop > this.offTop) {
                this.ele.addClass(this.className)
            } else {
                this.ele.removeClass(this.className)
            }
        }
    }
    new SuctionTop(".menubox", "menuboxScroll")

    function GoodsShop() {
        this.init();
    }
    GoodsShop.prototype = {
        constructor: GoodsShop,
        init() {
            this.carNum = $("#number")
            this.carNum.html(this.getSum());
        },
        changeNum() {
            this.carNum.html(this.getSum());
        },
        getSum() {
            var shopCarString = $.cookie("shopCar");
            // console.log(shopCarString)
            if (shopCarString) {
                var shopCarArray = JSON.parse(shopCarString);
                var sum = 0;
                shopCarArray.forEach(function(item) {
                    sum += Number(item.num);
                })
                return sum;
            }

            return 0;
        }
    }
    new GoodsShop();
})