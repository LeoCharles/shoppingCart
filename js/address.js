/*
 * @Author: Leo 
 * @Date: 2017-11-13 20:16:13 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-14 17:38:58
 */

var vm = new Vue({
    el: ".container",
    data: {
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        shippingMethod: 1,
        delFlag: false,
        editFlag: false,
        userName: '',
        streetName: '',
        tel:'',
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed: {
        filterAddress: function () {  
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function () {
            var _this = this;
            this.$http.get('data/address.json').then(function (response) {
                var res = response.data;
                if (res.status == "0") {
                  _this.addressList = res.result;
                }
            });
        },
        setDefault: function (addressId) {  
            this.addressList.forEach(function (item, index) {
                if(item.addressId == addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault =false;
                }
            });
        },
        delConfirm: function (index) {  
            this.delFlag = true;
            this.currentIndex = index;
        },
        delAddress: function () {
            this.addressList.splice(this.currentIndex, 1);
            this.delFlag = false;
        },
        editConfirm: function (item, index) {  
            this.editFlag = true;
            this.currentAddress = item;
            this.currentIndex = index;
            this.userName = item.userName;
            this.streetName = item.streetName;
            this.tel = item.tel;
        },
        editAddress: function () {
            // todo 编辑
            if (this.currentIndex === this.addressList.indexOf(this.currentAddress) ) {
                this.currentAddress.userName = this.userName.trim() ? this.userName.trim() : this.currentAddress.userName;
                this.currentAddress.streetName = this.streetName.trim() ? this.streetName.trim() : this.currentAddress.streetName;
                this.currentAddress.tel = this.tel.trim() ? this.tel.trim() : this.currentAddress.tel;
            } else {
                console.log(1);
            }

            this.editFlag = false;
        },
    }
});