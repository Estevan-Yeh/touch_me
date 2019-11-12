<template>
  <div>
    <header-view title="详情"></header-view>

    <!-- <div
      class="sure-order"
      v-if="sureOrder"
    >
      <image
        src="/static/sure-order.png"
        mode="widthFix"
      />
    </div> -->

    <div class="do-content">

      <div class="do-detail">
        <block v-if="details.urgent==0">
          <div class="do-shang txt-theme-color">
            <img
              class="shang"
              src="/static/detailsOrder/shang.png"
            >
            <div>￥<span>{{details.money}}</span></div>
          </div>
        </block>
        <block v-if="details.urgent==1">
          <div class="do-shang txt-theme-color">
            <img
              class="anxious"
              src="/static/detailsOrder/anxious.png"
            >
            <div>￥<span>{{details.money}}</span></div>
          </div>
          <div class="do-anxious">(加急单限接一个)</div>
        </block>
        <div class="normal-bold">
          【{{details.type}}】{{details.detail}}
        </div>
      </div>

      <div class="do-pos normal-bold">
        <div class="do-pos_1">
          <img src="/static/detailsOrder/pos-start.png">
          <div>{{details.startAddress}}</div>
        </div>
        <div>
          <img src="/static/detailsOrder/pos-end.png">
          <div>{{details.endAddress}}</div>
        </div>
      </div>

      <div class="do-tip normal-bold">
        <div class="do-tip_1">
          <img src="/static/detailsOrder/time.png">
          <div>{{details.requireReceiveTime}}前送达</div>
        </div>
        <div
          class="do-tip_2"
          v-if="phone==1"
        >
          <img src="/static/detailsOrder/phone.png">
          <div>{{details.phoneNumber}}</div>
        </div>
        <div class="do-tip_2">
          <img src="/static/detailsOrder/weight.png">
          <div>0-1KG</div>
        </div>
        <!-- <div class="do-tip_3">
          <img src="/static/detailsOrder/tip.png">
          <div>{{details.tip}}</div>
        </div> -->
      </div>

    </div>
    <div
      v-if="!sureOrder&&details.status!=2"
      class="do-footer"
    >
      <button @tap="tapButton">{{buttonFooter}}</button>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/Header'
import details from '@/store/detailsOrder'

export default {
  components: {
    HeaderView,
  },
  data: function () {
    return {
      details: {},
      buttonFooter: '',
      sureOrder: false,
      phone: 0
    }
  },
  onShow: function () {
    this.sureOrder = false
    this.details = details.state.details
    this.buttonFooter = details.state.buttonFooter
    this.phone = details.state.phone
  },
  methods: {
    goback: function () {
      wx.navigateBack({ delta: 1 })
    },
    tapButton: function () {
      var that = this
      if (this.buttonFooter == '确认订单') {
        wx.navigateTo({ url: '/pages/common/sureOrder/main' })
      } else if (this.buttonFooter == '我要抢单') {
        that.$http.post("order/heziqiang", {
          skey: 'heziqiang',
          idrewardId: that.details.id
        }).then((res) => {
          // console.log('res', res.data)
          wx.showToast({
            title: '抢单成功',
            icon: 'none',
            duration: 1500,
            complete: () => {
              let timeoutId = setTimeout(function () {
                clearTimeout(timeoutId)
                wx.navigateBack({ delta: 1 })
                wx.hideToast()
              }, 1500)
            }
          })
        }).catch((error) => { console.log(error.status) })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sure-order image {
  width: 100%;
}
.do-content {
  padding: 20rpx 61rpx;
  > div {
    background-color: #fff;
    margin-top: 32rpx;
  }
  .do-detail {
    border-radius: 30rpx;
    padding: 34rpx 46rpx 116rpx 61rpx;
    .do-shang {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 42rpx;
      img.shang {
        width: 98rpx;
        height: 98rpx;
        margin-right: 26rpx;
      }
      img.anxious {
        width: 64rpx;
        height: 97rpx;
        margin-right: 26rpx;
      }
      span {
        font-size: 60rpx;
      }
    }
    .do-anxious {
      font-size: 22rpx;
      font-weight: bold;
      letter-spacing: 3rpx;
      color: #ff0202;
      text-align: center;
    }
    .normal-bold {
      margin-top: 38rpx;
    }
  }
  .do-pos {
    border-radius: 20rpx;
    padding: 8rpx 0;
    > div {
      display: flex;
      align-items: center;
      padding: 14rpx 16rpx;
    }
    img {
      width: 56rpx;
      height: 68rpx;
      margin-right: 17rpx;
    }
    .do-pos_1 {
      border-bottom: 1rpx solid #eae9e9;
    }
  }
  .do-tip {
    padding: 28rpx 74rpx 74rpx 28rpx;
    border-radius: 20rpx;
    > div {
      display: flex;
      align-items: center;
    }
    .do-tip_1 img {
      width: 46rpx;
      height: 46rpx;
      margin-right: 17rpx;
    }
    .do-tip_2 {
      margin-top: 19rpx;
      img {
        width: 41rpx;
        height: 41rpx;
        margin-right: 20rpx;
        margin-left: 2rpx;
      }
    }
    .do-tip_3 {
      margin-top: 21rpx;
      img {
        width: 42rpx;
        height: 45rpx;
        margin-right: 22rpx;
        align-self: flex-start;
        margin-left: 3rpx;
      }
    }
  }
}

/*.do-tip img {
  width: 46rpx;
  height: 46rpx;
  margin-right: 17rpx;
} */

.do-footer {
  /* position: fixed; */
  width: 100%;
  margin-top: 80rpx;
  margin-bottom: 160rpx;
  button {
    width: 44%;
    font-size: 40rpx;
    letter-spacing: 4rpx;
    color: #928f8f;
    background-color: #ffe300;
    border-radius: 20rpx;
    border: none;
    &::after {
      border: none;
    }
  }
}
</style>

<style lang="wxss">
page {
  background-color: #f9f7f7 !important;
}
</style>
