$(function() {
    // function Close(ele, eleParent) {
    //     this.close = $(ele);
    //     this.parent = $(eleParent);
    //     this.init();
    // }
    // Close.prototype = {
    //     constructor: Close,
    //     init() {
    //         this.close.on("click", function() {
    //             this.parent.hide();
    //         }.bind(this))
    //     }

    // }
    // new Close(".close", "#shopCarId")
    // new Close(".bt_cancel", "#shopCarId")

    // //  add(增加)   reduce(减少) 更改num的数量
    // function ChangeNum(add, reduce, num) {
    //     this.add = $(add);
    //     this.numEle = $(num);
    //     this.num = parseInt(this.numEle.val());
    //     this.reduce = $(reduce);
    //     this.init();
    //     this.pre();
    //     this.change();
    // }
    // ChangeNum.prototype = {
    //     constructor: ChangeNum,
    //     init() {
    //         //增加数量
    //         this.add.on("click", function() {
    //             this.num += 1;
    //             this.numEle.val(this.num);
    //         }.bind(this))
    //     },
    //     pre() {
    //         //减少数量
    //         this.reduce.on("click", function() {
    //             if (this.num <= 1) return;
    //             this.num -= 1;
    //             this.numEle.val(this.num);
    //         }.bind(this))
    //     },
    //     change() {
    //         //改变数量
    //         this.numEle.on("keyup", function() {
    //             this.numEle.val(this.numEle.val());
    //             this.num = parseInt(this.numEle.val());
    //         }.bind(this))
    //     }
    // }



    // new ChangeNum("#plus", "#subtract", "#nums")
    // $("#oBox").delegate(".btn3", "click", function() {
    //     $("#shopCarId").find(".buy_num").val("1")
    //     $("#shopCarId").show()
    //     console.log(this);
    //     new ChangeNum("#plus", "#subtract", "#nums")
    // })
})