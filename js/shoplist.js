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
$(function() {

    $(function() {
        function AddCar() {
            this.main = $("#oBox");
            this.Rendering();
            this.init();
            // this.main = $(".addCar");
        }
        AddCar.prototype = {
            constructor: AddCar,
            init() {
                // this.Rendering();
                // this.main = $(".addCar");
                this.carNum = $("#number")
                this.carNum.html(this.getSum());
                this.main.on("click.addCar", "a[data_id]", $.proxy(this.Add, this));
                this.main.on("click.changeNum", "a[data-id]", $.proxy(this.changeNum, this));
                // this.Add();
                // this.main = $(".addCar");
                // console.log(this.main)
            },
            Rendering() {

                $.ajax({
                        url: "./data/shoplist.json"
                    })
                    .then(function(res) {
                            var html = ""
                            res.forEach(function(item) {
                                html += `
                      <div class="productBox"">
                        <li >
                        <div class="pro">
                            <div class="p-img"   >
                                <a href="javaScript:;" target="_blank">
                                    <img id="${item.id}" src="${item.images}" style="display: inline;">
                                </a>
                            </div>
                            <div class="p-price">￥${item.price}
                            </div>
                            <div class="p-name"><a title="茶叶鲜叶" href="" target="_blank">${item.pro}</a></div>

                            <div class="extra">
                                <a style="color:#999999;line-height: 25px;display: inline-block; width: 50%;float: left;height: 25px;" href="" title="雅安雅供" target="_blank">
                                    <span title="雅安雅供" style="display: block;height: 100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                            ${item.shop}
            		</span>
                                </a>
                                <div class="p-address" title="四川 雅安市">
                                    ${item.prosition}
                                </div>
                            </div>
                            <div class="renzheng">
                            </div>
                            <div class="btns">
                                <a href="#this" class="btn3 collect">
                                    <span onclick="addFavoriteProduct('茶叶鲜叶','0000141492',this)">收藏</span>
                                </a>
                                <a href="#this" class="btn3 contrast">
                                    <input type="checkbox" class="compare_close" value="对比" id="0000141492">
                                    <label for="checkbox"> 对比</label>
                                </a>
                                <a id="addTringToShopCardId${item.id}" data_id="${item.id}" class="btn3 addCar" href="javascript:void(0)"><i class="item-icon"></i>加入购物车</a>
                            </div>
                        </div>
                    </li>
                </div>`

                            }.bind(this))
                            $("#oBox").html(html);

                        }.bind(this)

                    )
                    .then(function() {
                        //页面传参
                        $(".pro").delegate("img", "click", function() {
                            var url = "details.html?id=" + this.id;
                            window.location.href = url;
                            console.log(url)
                        })
                    }.bind(this));
            },
            Add(event) {
                //id获取 ---start;
                //我怎么知道当前点击的元素是谁;
                var target = event.target || event.srcElement;
                // console.log(target)
                var goodsId = $(target).attr("data_id");
                console.log(goodsId)
                    //id获取 ---end;

                //操作cookie存入购物车;
                // [{"id":,"num"}]

                if (!$.cookie("shopCar")) {
                    //表示是第一次存数据;
                    var shopCarArray = [{
                        id: goodsId,
                        num: 1
                    }]
                    $.cookie("shopCar", JSON.stringify(shopCarArray))
                        // console.log($.cookie("shopCar"));
                    return 0;
                }
                //其余次数进行购物车添加;

                //id是否在购物车之中存在;

                var shopCarString = $.cookie("shopCar");
                var shopCarArray = JSON.parse(shopCarString);
                // console.log(shopCarArray)
                // console.log(shopCarArray)
                var hasItem = false;
                shopCarArray.forEach(function(item) {
                    // console.log(item);
                    //如果购物车列表之中有当前项，让商品数量自增就可以了;
                    if (item.id == goodsId) {
                        item.num++;
                        hasItem = true;
                    }
                })
                if (!hasItem) {
                    // console.log(1)
                    var item = {
                        id: goodsId,
                        num: 1
                    }
                    shopCarArray.push(item)
                }
                $.cookie("shopCar", JSON.stringify(shopCarArray));
                // console.log($.cookie("shopCar"));
            },
            changeNum() {
                this.carNum.html(this.getSum());
            },
            getSum() {
                var shopCarString = $.cookie("shopCar");
                console.log(shopCarString)
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

        new AddCar()

    })
})