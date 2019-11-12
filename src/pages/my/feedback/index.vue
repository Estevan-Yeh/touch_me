<template>
  <div class="feedback">
    <header-view title="问题反馈"></header-view>
    <div class="box">
      <textarea
        maxlength="-1"
        v-model="feedback"
        placeholder="请输入您的问题反馈"
      >
      </textarea>
    </div>
    <button @tap="submit">提交反馈</button>
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
      feedback: ''
    }
  },
  methods: {
    submit () {
      var that = this
      that.$http.post("feedback/linzihao", {
        skey: 'linzihao',
        detail: that.feedback,
        contactInfo: '13225465447'
      }).then((res) => {
        // console.log('res', res.data)
        wx.showToast({
          title: '感谢您的反馈',
          icon: 'none',
          duration: 1500,
          complete: () => {
            console.log(that.addressDetails)
            let timeoutId = setTimeout(function () {
              clearTimeout(timeoutId)
              wx.hideToast()
            }, 1500)
          }
        })
      }).catch((error) => { console.log(error.status) })
    }
  },
}
</script>

<style lang="less" scoped>
.feedback {
  .box {
    background-color: #ffffff;
    border-radius: 10rpx;
    margin: 70rpx 56rpx;
    padding: 20rpx;
    font-size: 30rpx;
    line-height: 36rpx;
    letter-spacing: 4rpx;
    color: #707070;
    height: 400rpx;
    textarea {
      width: 100%;
      height: 100%;
    }
  }
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
  /* button {
    width: 364rpx;
    background-color: #ffe300;
    border-radius: 10rpx;
    font-family: AdobeHeitiStd-Regular;
    font-size: 40rpx;
    letter-spacing: 18rpx;
    color: #848484;
    &::after {
      border: none;
    }
  } */
}
</style>

<style lang="wxss">
page {
  background-color: #f6f3f3;
}
</style>
