<template>
  <div>
    <header-view title="关于我们"></header-view>
    <div class="about">
      {{about}}
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/Header'

export default {
  components: {
    HeaderView
  },
  data () {
    return {
      about: '赏金宝，是一款专为大学生提供优质便捷服务的人才资源流动小程序平台。以 “方便校园生活” 为口号，解决校内资源供需矛盾问题。'
    }
  },
}
</script>

<style scoped>
.about {
  background-color: #ffffff;
  border-radius: 10rpx;
  margin: 70rpx 56rpx;
  padding: 20rpx;
  font-size: 30rpx;
  line-height: 36rpx;
  letter-spacing: 4rpx;
  color: #707070;
}
</style>

<style lang="wxss">
page {
  background-color: #f6f3f3;
}
</style>
