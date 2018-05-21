$(function() {


    // function Banner() {
    //     this.banner = $("#banner");
    //     this.init();
    // }
    // Banner.prototype = {
    //     constructor: Banner,
    //     init() {
    //         this.index = 0;
    //         // 主体元素选择;
    //         this.bannerWrapper = $(".banner-wrapper");
    //         //具体元素获取;
    //         this.bannerItem = this.bannerWrapper.children("div");
    //         //this.bannerItem.size() == this.bannerItem.length
    //         this.bannerNum = this.bannerItem.length;
    //         //console.log(this.bannerNum);
    //     }
    // }
    // new Banner();





    function SideBar() {
        this.elevator = $("#elevatorNew");
        this.firLi = this.elevator.find("ul>li").eq(0);
        this.lasLi = this.elevator.find("ul>li").eq(1);
        this.lastTop = $("#w_floor_4").offset().top;
        this.init()
    }
    SideBar.prototype = {
        constructor: SideBar,
        init() {
            //console.log(this.firLi)
            $(document).on("scroll", function() {
                this.offTop = $("html").scrollTop();
                if (this.offTop < 1000) {
                    this.elevator.css("display", "none")
                        // this.firLi.css()
                } else if (this.offTop > this.lastTop - 150) {
                    this.elevator.css("display", "block");
                    this.lasLi.addClass("cur")
                    this.firLi.removeClass("cur")

                } else {
                    this.elevator.css("display", "block");
                    this.lasLi.removeClass("cur")

                    this.firLi.addClass("cur")
                }

            }.bind(this))
        }
    }
    new SideBar()

    $("a").click(function() {
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - 40 + "px" }, 500);
        return false;
    });


    function Ashow(ele) {
        this.oBox = $(ele);
        this.firli = $(ele + " a:first");
        this.lasli = $(ele + " a:last");
        this.init();
    }
    Ashow.prototype = {
        constructor: Ashow,
        init() {
            this.oBox.on("mouseenter", function() {
                this.firli.hide();
                this.lasli.show();
            }.bind(this))
            this.oBox.on("mouseleave", function() {
                this.firli.show();
                this.lasli.hide();
            }.bind(this))
        }
    }
    new Ashow(".scroll_top")
    new Ashow(".contact_service")
    new Ashow(".tab_cart")

})