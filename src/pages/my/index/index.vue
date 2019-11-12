<template>
  <div>
    <div class="my-header">
      <img
        class="my-header-bg"
        src="/static/my/bg.png"
      >

      <div
        class="my-calling-card"
        v-if="login==1"
      >
        <div class="img-user">
          <img :src="userAvatarUrl">
        </div>
        <div class="flex_1">
          <div class="my-name-credit">
            <div class="my-name">
              <div>{{userNickName}}</div>
              <img
                v-if="userGender==0"
                src="/static/my/girl.png"
              >
              <img
                v-if="userGender==1"
                src="/static/my/man.png"
              >
            </div>
            <div class="my-credit txt-normal">
              <img src="/static/my/s.png">
              信用积分：9
            </div>
          </div>
          <!-- <div class="my-id normal-bold">ID：fx87634521</div> -->
        </div>
      </div>

      <div
        class="no-login flex-ccc"
        v-else
      >
        <button
          open-type="getUserInfo"
          @getuserinfo="getuserinfo"
        >点击登录</button>
        <!-- <button @tap="tapLogin">点击登录</button> -->
      </div>

    </div>

    <div class="my-menu">
      <div
        class="my-wallet"
        @tap="toOrdersDetails"
      >
        <img src="/static/my/wallet.png">
        <div class="normal-bold">账单明细</div>
      </div>
      <div
        class="my-student"
        @tap="toIdentification"
      >
        <img src="/static/my/student.png">
        <div class="normal-bold">学生认证</div>
      </div>
      <div
        class="my-student"
        @tap="toAddress"
      >
        <img src="/static/my/pos.png">
        <div class="normal-bold">我的地址</div>
      </div>
      <div
        class="my-question"
        @tap="toComment"
      >
        <img src="/static/my/comment.png">
        <div class="normal-bold">我的评价</div>
      </div>
      <div
        class="my-question"
        @tap="toFeedback"
      >
        <img src="/static/my/question.png">
        <div class="normal-bold">问题反馈</div>
      </div>
      <div
        class="my-us"
        @tap="toAbout"
      >
        <img src="/static/my/us.png">
        <div class="normal-bold">关于我们</div>
      </div>
    </div>

    <!-- <div class="my-exit">
      <button>退出登录</button>
    </div> -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      userAvatarUrl: '',
      userNickName: '',
      userGender: 2,
      login: 1
    }
  },
  created: function () {
    /* wx.login({
      success (res) {
        console.log('login', res.code)
        if (res.code) {
          //发起网络请求
          that.$http.get('user/login/' + res.code).then((res) => {
            console.log('登录成功', res)
          })
        } else {
          console.log('登录失败！' + res)
        }
      }
    }) */
    var that = this
    wx.getUserInfo({
      success (res) {
        // console.log(res.userInfo)
        that.login = 1
        that.userNickName = res.userInfo.nickName
        that.userAvatarUrl = res.userInfo.avatarUrl
        that.userGender = res.userInfo.gender
      },
      fail () {
        that.login = 0
      }
    })
  },
  methods: {
    getuserinfo: function (res) {
      var that = this
      console.log('getuserinfo', res)
      that.userNickName = res.mp.detail.userInfo.nickName
      that.userAvatarUrl = res.mp.detail.userInfo.avatarUrl
      that.userGender = res.mp.detail.userInfo.gender
      that.login = 1
    },
    toAddress: function () {
      wx.navigateTo({ url: "/pages/my/address/main" })
    },
    toIdentification: function () {
      wx.navigateTo({ url: "/pages/my/identification/main" })
    },
    toComment: function () {
      wx.navigateTo({ url: "/pages/my/comment/main" })
    },
    toOrdersDetails: function () {
      wx.navigateTo({ url: "/pages/my/ordersDetails/main" })
    },
    toAbout: function () {
      wx.navigateTo({ url: "/pages/my/about/main" })
    },
    toFeedback: function () {
      wx.navigateTo({ url: "/pages/my/feedback/main" })
    }
  },
}
</script>

<style lang="less" scoped>
.my-header {
  .my-header-bg {
    position: absolute;
    height: 442rpx;
    width: 100%;
    z-index: -1;
  }
  .my-calling-card {
    display: flex;
    padding-top: 148rpx;
    padding-bottom: 118rpx;
    align-items: center;
    .img-user {
      width: 176rpx;
      height: 176rpx;
      margin-left: 50rpx;
      margin-right: 22rpx;
      border-radius: 100%;
      overflow: hidden;
      > img {
        border-radius: 100%;
        width: 176rpx;
        height: 176rpx;
      }
    }
    > .flex_1 {
      flex: 1;
      .my-name-credit {
        display: flex;
        justify-content: space-between;
        .my-name,
        .my-id {
          color: #ababab;
        }
        .my-name {
          display: flex;
          align-items: center;
          font-size: 38rpx;
          letter-spacing: 5rpx;
          font-weight: bold;
          > img {
            width: 37rpx;
            height: 37rpx;
          }
        }
        .my-credit {
          background-color: #f19ec2;
          border-radius: 29rpx 0 0 29rpx;
          color: #fff;
          font-weight: bold;
          padding-top: 10rpx;
          padding-right: 8rpx;
          padding-bottom: 12rpx;
          padding-left: 20rpx;
          > img {
            width: 28rpx;
            height: 28rpx;
            margin-right: 2rpx;
            position: relative;
            top: 4rpx;
          }
        }
      }
    }
  }
  .no-login {
    height: 442rpx;
    button {
      width: 44%;
      font-size: 40rpx;
      letter-spacing: 4rpx;
      color: #928f8f;
      background-color: #fafafa;
      border-radius: 20rpx;
      border: none;
      &::after {
        border: none;
      }
    }
  }
}
.my-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > div {
    min-width: 33%;
    flex: 1;
    border-bottom: solid 1rpx #eae9e9;
    text-align: center;
    height: 238rpx;
    box-sizing: border-box;
    padding-top: 52rpx;
    color: #ababab;
    > img {
      width: 70rpx;
      height: 74rpx;
    }
  }
  .my-wallet,
  .my-question,
  .my-student {
    border-right: solid 1rpx #eae9e9;
  }
}

/* .my-exit {
  text-align: center;
  margin-top: 106rpx;
}
.my-exit button {
  font-size: 36rpx;
  color: #7f7f7b;
  background-color: #e5e5e5;
  border-radius: 10rpx;
  width: 286rpx;
  border: none;
}
.my-exit button::after {
  border-radius: 10rpx;
  border: none;
} */
</style>
