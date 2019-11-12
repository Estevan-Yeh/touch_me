<template>
  <div>
    <div class="header">
      <img
        src="/static/detailsOrder/return.png"
        @tap="goback"
      >
      <div>{{title}}</div>
    </div>
    <!-- <div class="page-header"></div> -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      value: ''
    },
    goback: {
      type: Function,
      default: () => () => {
        wx.navigateBack({ delta: 1 })
      }
    }
  }
}
</script>

<style scoped>
/* .page-header {
  height: 127rpx;
} */
.header {
  letter-spacing: 4rpx;
  color: #010101;
  font-size: 38rpx;
  line-height: 32rpx;
  border-bottom: 1rpx solid #e7e5e5;
  display: flex;
  /* position: fixed;
  background-color: #f9f7f7;
  width: 100%; */
}
.header img {
  width: 22rpx;
  height: 36rpx;
  padding-top: 60rpx;
  padding-bottom: 31rpx;
  padding-left: 51rpx;
}
.header div {
  padding-top: 60rpx;
  flex-basis: 100%;
  text-align: center;
  padding-right: 73rpx;
}
</style>
