/*
 * @Author: Leo 
 * @Date: 2017-11-09 21:29:18 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-12 23:18:48
 */
var vm = new Vue({
    el: '#app',
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        curProduct: '',
    },
    filters: {
        formatMoney: function (value) {
            return '￥' + value.toFixed(2);
        }
    },
    mounted: function () {
        this.cartView();
    },
    methods: {
        cartView: function () {
            this.$http.get('data/cartData.json').then(res => {
                this.productList = res.data.result.list;
            });
        },
        changeMoney: function (product, way) {
            if(way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if(product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcToTalPrice();
        },
        selectedProduct: function (item) {
            if(typeof item.checked == 'undefined') {
                this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            this.calcToTalPrice();
        },
        checkAll: function (flag) {
            var _this = this;
            this.checkAllFlag = flag;
            this.productList.forEach(function (item, index) { 
                if(typeof item.checked == 'undefined') {
                    _this.$set(item, 'checked', _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcToTalPrice();
        },
        calcToTalPrice: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function(item, index) {
                if(item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            });
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function () {
            // 模拟删除，实际工作中是调后台删除接口
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
});