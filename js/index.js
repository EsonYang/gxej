$(function() {
    function Show(ele) {
        this.oBox = $(ele);
        this.mouseShow = $(ele + "> div");
        this.init();
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
        }
    }
    new Show("._oBox")

    function Banner() {
        this.banner = $("#banner");
        this.init();
    }
    Banner.prototype = {
        constructor: Banner,
        init() {
            this.index = 0;
            // 主体元素选择;
            this.bannerWrapper = $(".banner-wrapper");
            //具体元素获取;
            this.bannerItem = this.bannerWrapper.children("div");
            //this.bannerItem.size() == this.bannerItem.length
            this.bannerNum = this.bannerItem.length;
            //console.log(this.bannerNum);
        }
    }
    new Banner();

})