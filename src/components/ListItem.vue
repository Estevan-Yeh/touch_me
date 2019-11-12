<template>
  <div
    class="index-list-item"
    @tap="tapItem(item)"
  >
    <div class="index-litme-content">
      <div>
        <img
          v-if="item.urgent==1"
          src="/static/detailsOrder/anxious.png"
          class="urgent"
        >
        <span class="normal-bold">【{{item.type}}】</span>
        <span
          v-if="item.urgent==1"
          class="urgent"
        >急！！！</span>
        <span class="txt-mid">{{item.detail}}</span>
      </div>
      <div class="txt-sm">　{{item.requireReceiveTime}} {{item.endAddress}}</div>
    </div>
    <div
      class="index-litem-tip"
      :class="item.status==2?'index-finish':''"
    >
      <div class="ilt-bg"><img src="/static/index/finish.png"></div>
      <div class="txt-sm">赏金：<span class="txt-theme-color">￥<span class="txt-mid">{{item.money}}</span></span></div>
      <div
        class="mid-bold"
        v-if="item.status==0"
      >待接单</div>
      <div
        class="mid-bold"
        v-else-if="item.status==1"
      >已接单</div>
      <div
        class="mid-bold"
        v-else-if="item.status==3"
      >已取消</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Array
    },
    tapItem: {
      type: Function
    }
  }
}
</script>

<style lang="less" scoped>
.index-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 45rpx;
  border-top: #e9e9e9 1rpx solid;
  background-color: #fff;
  .txt-sm {
    color: #ababab;
  }
  .index-litme-content {
    padding-top: 38rpx;
    padding-bottom: 35rpx;
    .txt-sm {
      margin-top: 14rpx;
    }
    > div {
      width: 520rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span.urgent {
      font-size: 28rpx;
      font-weight: bold;
      letter-spacing: 4rpx;
      color: #fc0303;
    }
    img.urgent {
      width: 24rpx;
      height: 38rpx;
      position: absolute;
      margin-left: -16rpx;
      margin-top: 8rpx;
    }
  }
  .index-litem-tip {
    width: 170rpx;
    .mid-bold {
      background-color: #d1d0d0;
      border-radius: 10rpx;
      color: #888;
      padding-top: 2rpx;
      padding-bottom: 4rpx;
      margin-top: 10rpx;
      width: 94rpx;
      text-align: center;
    }
    .ilt-bg {
      display: none;
    }
    &.index-finish {
      position: relative;
      > div {
        position: relative;
      }
      > div.ilt-bg {
        display: inline;
        position: absolute;
        bottom: -46rpx;
        right: 14rpx;
        opacity: 0.9;
        z-index: 1;
      }
      img {
        width: 192rpx;
        height: 119rpx;
      }
      > .mid-bold {
        visibility: hidden;
      }
    }
  }
}
</style>
