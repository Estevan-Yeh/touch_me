<template>
  <div class="sure-order">
    <div class="header">
      <img
        src="/static/detailsOrder/return.png"
        @tap="goback"
      >
      <div>确认订单</div>
    </div>
    <div class="img">
      <img src="/static/common/sure-order.png">
      <div>
        <img src="/static/common/thanks.png">
      </div>
    </div>
    <div class="flex-cc">
      <div class="title">评价</div>
      <div class="stars">
        <img
          v-for="(item,index) in 5"
          :key="index"
          :src="index<stars?'/static/images/star_fill.png':'/static/images/star.png'"
          @tap="tapStars(index)"
        >
      </div>
      <div class="comment">
        <textarea
          maxlength="-1"
          v-model="comment"
        />
        </div>
      <button @tap="orderArrive">确认</button>
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
  data () {
    return {
      stars: 5,
      comment: ''
    }
  },
  methods: {
    tapStars (index) {
      this.stars = index + 1
    },
    goback () {
      // console.log(222)
      wx.navigateBack({ delta: 2 })
    },
    orderArrive () {
      var that = this
      /* that.$http.post("comment", {
        starNumber: that.stars,
        detail: that.comment,
        orderId: 0
      }).then((res) => {
        // console.log('res', res.data)
        wx.showToast({
          title: '确认订单成功',
          icon: 'none',
          duration: 1500,
          complete: () => {
            let timeoutId = setTimeout(function () {
              clearTimeout(timeoutId)
              wx.navigateBack({ delta: 2 })
            }, 1500)
          }
        })
      }).catch((error) => { console.log(error.status) }) */
      wx.showToast({
        title: '确认订单成功',
        icon: 'none',
        duration: 1500,
        complete: () => {
          let timeoutId = setTimeout(function () {
            clearTimeout(timeoutId)
            wx.navigateBack({ delta: 2 })
          }, 1500)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  letter-spacing: 4rpx;
  color: #010101;
  font-size: 38rpx;
  line-height: 32rpx;
  border-bottom: 1rpx solid #e7e5e5;
  display: flex;
  img {
    width: 22rpx;
    height: 36rpx;
    padding-top: 60rpx;
    padding-bottom: 31rpx;
    padding-left: 51rpx;
  }
  div {
    padding-top: 60rpx;
    flex-basis: 100%;
    text-align: center;
    padding-right: 73rpx;
  }
}
.sure-order {
  > .img {
    text-align: center;
    > img {
      width: 100rpx;
      height: 144rpx;
      margin-top: 66rpx;
      margin-bottom: 44rpx;
      padding-right: 30rpx;
    }
    > div > img {
      width: 160rpx;
      height: 56rpx;
    }
  }
  > .flex-cc {
    background-color: #ffffff;
    border-radius: 10px;
    margin: 64rpx 88rpx;
    .title {
      font-family: MicrosoftYaHei;
      font-size: 36rpx;
      letter-spacing: 4rpx;
      color: #707070;
      padding-top: 34rpx;
    }
    .stars {
      img {
        width: 58rpx;
        height: 56rpx;
      }
    }
    .comment {
      width: 398rpx;
      height: 135rpx;
      border-radius: 10rpx;
      border: solid 1rpx #c4c0c0;
      overflow: hidden;
      padding: 20rpx;
      textarea {
        width: 100%;
        height: 100%;
      }
    }
    > button {
      margin: 30rpx 0rpx;
      width: 222rpx;
      background-color: #f2cb51;
      box-shadow: 0rpx 0rpx 7rpx 0rpx rgba(235, 197, 79, 0.58);
      border-radius: 50rpx;
      font-size: 28rpx;
      line-height: 52rpx;
      letter-spacing: 3rpx;
      color: #707070;
      &::after {
        border: none;
      }
    }
  }
}
</style>

<style lang="wxss">
page {
  background-color: #f9f7f7 !important;
  padding-bottom: 158rpx;
}
</style>
