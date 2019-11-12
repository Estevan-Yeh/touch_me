<template>
  <div>
    <header-view title="我的地址"></header-view>

    <div
      class="ad-content"
      v-for="(item, index) in addressList"
      :key="index"
      @tap="toAddressEdit(item)"
    >
      <img
        v-if="index==0"
        src="/static/my/moren.png"
      >
      <div :class="index==0?'':'border-top'">
        <div>
          <div class="txt-normal">
            <span>{{item.username}}</span>
            {{item.phoneNumber}}
          </div>
          <div class="txt-sm">广东省江门市蓬江区 五邑大学 {{item.dormAddress}}</div>
        </div>
        <img src="/static/edit.png">
      </div>
    </div>

    <button @tap="toAddressEdit()">添加收货地址</button>
  </div>
</template>

<script>
import HeaderView from '@/components/Header'
import address from '@/store/address'

export default {
  components: {
    HeaderView,
  },
  data: function () {
    return {
      addressList: []
    }
  },
  computed: {
    getAdressList () {
      return address.state.addressList
    }
  },
  watch: {
    getAdressList (val) {
      this.addressList = val
    }
  },
  created () {
    var that = this
    that.$http.get("address/getDefaultAddress/linzihao").then((res) => {
      // console.log('DefaultAddress', res.data.data)
      address.commit('initDefaultAddress', res.data.data)
    })
  },
  onReady () {
    var that = this
    that.$http.get("address/linzihao").then((res) => {
      // console.log('addressList', res.data.addressList)
      address.commit('initAddressList', res.data.addressList)
    })
  },
  methods: {
    goback: function () {
      wx.navigateBack({ delta: 1 })
    },
    toAddressEdit: function (item) {
      if (item) {
        address.commit('initAddressDetails', item)
      } else {
        var item = {
          username: '',
          phoneNumber: '',
          dormAddress: ''
        }
        address.commit('initAddressDetails', item)
      }
      wx.navigateTo({ url: '/pages/my/addressEdit/main' })
    }
  }
}
</script>

<style lang="less" scoped>
.ad-content {
  > img {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
  }
  > div {
    display: flex;
    padding: 24rpx 0;
    margin-left: 62rpx;
    margin-right: 46rpx;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    img {
      width: 34rpx;
      height: 33rpx;
    }
    .txt-sm {
      margin-top: 10rpx;
    }
    .txt-normal > span {
      margin-right: 50rpx;
    }
    &.border-top {
      border-top: 1rpx #e5e5e5 solid;
    }
  }
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
</style>
