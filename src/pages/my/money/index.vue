<template>
  <div>
    <header-view title="我的余额"></header-view>

    <div>
      <div class="flex-bc">
        <div>余额：</div>
        <div>{{money}}</div>
      </div>
      <div class="flex-bc">
        <div>优惠券</div>
        <div>{{coupon}}</div>
      </div>
      <div class="flex-bc">
        <div>账单明细</div>
        <img src="/static/detailsOrder/return.png">
      </div>
      <div class="flex-bc">
        <div>押金</div>
        <img src="/static/detailsOrder/return.png">
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/Header'

export default {
  components: {
    HeaderView,
  },
  data: function () {
    return {
      money: "807.00",
      coupon: "2"
    }
  },
  methods: {
    goback: function () {
      wx.navigateBack({ delta: 1 })
    }
  }
}
</script>

<style scoped>
.flex-bc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-left: 48rpx;
  padding-right: 48rpx;
}
.flex-bc img {
  width: 30rpx;
  height: 30rpx;
}
</style>

<style lang="wxss">
page {
  background-color: #f6f3f3;
}
</style>
