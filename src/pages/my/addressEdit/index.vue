<template>
  <div class="address-edit">
    <header-view
      title="编辑收货地址"
      :goback="goback"
    ></header-view>
    <div class="flex-c">
      <div>姓名：</div>
      <div>
        <input
          type="text"
          v-model="addressDetails.username"
          placeholder="点击输入姓名"
        >
      </div>
    </div>
    <div class="border-b"></div>
    <div class="flex-c">
      <div>联系电话：</div>
      <div>
        <input
          type="text"
          v-model="addressDetails.phoneNumber"
          placeholder="点击输入手机号码"
        >
      </div>
    </div>
    <div class="border-b"></div>
    <div class="flex-c">
      <div>地址：</div>
      <div>
        <input
          type="text"
          disabled="true"
          v-model="address"
        >
      </div>
    </div>
    <div class="border-b"></div>
    <div class="flex-c">
      <div>宿舍号：</div>
      <div>
        <input
          type="text"
          v-model="addressDetails.dormAddress"
          placeholder="点击输入宿舍号 如：19-228"
        >
      </div>
    </div>
    <div class="border-b"></div>
    <div class="flex-csb">
      <div>设为默认地址</div>
      <switch color="#f7e4a9"></switch>
    </div>
    <div class="border-b"></div>
    <div
      class="delete"
      v-if="addA==0"
      @tap="tapDelete"
    >
      删除地址
    </div>
    <div class="border-b"></div>

    <button
      v-if="addA==1"
      @tap="addAddress"
    >添加收货地址</button>
  </div>
</template>

<script>
import HeaderView from '@/components/Header'
import address from '@/store/address'

export default {
  components: {
    HeaderView
  },
  data: function () {
    return {
      address: '广东省 江门市 蓬江区 五邑大学',
      addA: 0
    }
  },
  computed: {
    addressDetails () {
      return address.state.addressDetails
    }
  },
  onShow: function () {
    if (!!!this.addressDetails.id) {
      this.addA = 1
    } else {
      this.addA = 0
    }
  },
  methods: {
    goback: function () {
      var that = this
      wx.navigateBack({
        delta: 1,
        success () {
          if (that.addA == 0) {
            that.$http.post("address/linzihao", {
              skey: 'linzihao',
              username: that.addressDetails.username,
              phoneNumber: that.addressDetails.phoneNumber,
              dormAddress: that.addressDetails.dormAddress
            }).then((res) => {
              that.$http.get("address/linzihao").then((res) => {
                console.log('addressList', res.data.addressList)
                address.commit('initAddressList', res.data.addressList)
              })
            })
          }
        }
      })
    },
    addAddress: function () {
      var that = this
      that.$http.post("address/linzihao", {
        skey: 'linzihao',
        username: that.addressDetails.username,
        phoneNumber: that.addressDetails.phoneNumber,
        dormAddress: that.addressDetails.dormAddress
      }).then((res) => {
        that.$http.get("address/linzihao").then((res) => {
          // console.log('addressList', res.data.addressList)
          address.commit('initAddressList', res.data.addressList)
        })
      })
    },
    tapDelete: function () {
      var that = this
      wx.showModal({
        title: '提示',
        content: '确定删除？',
        cancelColor: '#707070',
        confirmColor: '#fd0606',
        success (res) {
          if (res.confirm) {
            that.$http.delete("address/" + that.addressDetails.id).then((res) => {
              console.log('delete', res)
            })
            // console.log('用户点击确定')
          } /* else if (res.cancel) {
            console.log('用户点击取消')
          } */
        }
      })
      注意
    }/* ,
    save: function () {
      var that = this
      that.$http.post("address/linzihao", {
        skey: 'linzihao',
        id: that.addressDetails.id
      }).then((res) => {
        // console.log('res', res.data)
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 1500,
          complete: () => {
            console.log(that.addressDetails)
            let timeoutId = setTimeout(function () {
              clearTimeout(timeoutId)
              wx.hideToast({
                success: () => {
                  that.goback()
                }
              })
            }, 1500)
          }
        })
      }).catch((error) => { console.log(error.status) })
    } */
  }
}
</script>

<style lang="less" scoped>
.border-b {
  border-bottom: 1rpx solid #eae9e9;
  margin: 0 66rpx;
}
.address-edit {
  font-size: 28rpx;
  letter-spacing: 4rpx;
  color: #707070;
  line-height: 20rpx;
  > .flex-c {
    padding: 32rpx 60rpx;
    input {
      width: 450rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  > .flex-csb {
    padding: 68rpx 60rpx 10rpx;
    switch {
      zoom: 0.7;
    }
  }
  > .delete {
    color: #fd0606;
    padding: 30rpx 60rpx;
  }
  button {
    margin-top: 142rpx;
    width: 498rpx;
    font-family: FangSong;
    font-size: 35rpx;
    letter-spacing: 4rpx;
    color: #fe0202;
    background-color: #f9f9f8;
    border-radius: 10rpx;
    border: none;
    &::after {
      border: none;
    }
  }
}
</style>
