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
new Show(".select-sp", ".select-con");
$(function() {
    //吸顶    ele为要吸顶的部分   className为吸顶后的class名
    function SuctionTop(ele, className) {
        this.className = className;
        this.ele = $(ele);
        this.init();
        this.constider()
        this.offTop = this.ele.offset().top;
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
})