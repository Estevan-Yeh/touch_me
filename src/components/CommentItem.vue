<template>
  <div
    class="comment-item"
    @tap="tapItem(item)"
  >
    <div class="flex-c">
      <img :src="item.avatarUrl">
      <div class="name">{{item.username}}</div>
    </div>
    <div class="flex-c">
      <div class="font-tip">{{item.publishTime}}</div>
      <div class="font-tip">【{{item.rewardTypeName}}】</div>
      <div class="stars flex-c">
        <img
          v-for="(star, index) in 5"
          :key="index"
          :src="index<item.starNumber?'/static/images/star_fill.png':'/static/images/star.png'"
        >
      </div>
    </div>
    <div class="comment">
      {{item.detail}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    tapItem: {
      type: Function
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  background-color: #fff;
  padding: 34rpx 56rpx 56rpx;
  border-bottom: solid 1rpx #eae9e9;
  > .flex-c {
    > img {
      width: 72rpx;
      height: 72rpx;
      border-radius: 100%;
      margin-right: 20rpx;
    }
    .name {
      font-family: MicrosoftYaHei;
      font-size: 28rpx;
      letter-spacing: 3rpx;
      color: #707070;
    }
    .stars {
      img {
        width: 30rpx;
        height: 30rpx;
      }
    }
  }

  .font-tip {
    font-family: MicrosoftYaHei;
    font-size: 20rpx;
    letter-spacing: 2rpx;
    color: #aeacac;
    margin-right: 16rpx;
  }
  .comment {
    font-family: MicrosoftYaHei;
    font-size: 28rpx;
    letter-spacing: 2rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 8rpx;
  }
}
</style>
