<template>
  <div class="identification">
    <header-view title="学生认证"></header-view>

    <div class="camera">
      <div
        v-show="camera==0"
        class="flex-ccc"
        @tap="getCamera"
      >
        <img src="/static/camera.png">
        <div>请上传学生证/校园卡头像证明</div>
      </div>
      <div v-show="camera==1">
        <camera
          device-position="back"
          flash="auto"
          @error="error"
        >
        </camera>
      </div>
      <div v-show="camera==2">
        <img :src="tempImagePath">
      </div>
      <button
        v-show="camera==1 || camera==2"
        @tap="takePhoto"
      >{{camera==1?'点击拍照':'点击重拍'}}</button>
    </div>
    <button @tap="submit">点击上传</button>
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
      camera: 0,
      tempImagePath: ''
    }
  },
  onShow () {
    this.camera = 0
  },
  methods: {
    goback: function () {
      wx.navigateBack({ delta: 1 })
    },
    getCamera () {
      var that = this
      wx.getSetting({
        success (res) {
          // console.log(res.authSetting)
          if (!res.authSetting['scope.camera']) {
            wx.openSetting({
              scope: 'scope.camera',
              success (res) {
                // console.log(res)
                that.camera = 1
              }
            })
          } else {
            that.camera = 1
          }
        }
      })
    },
    takePhoto () {
      var that = this
      if (that.camera == 1) {
        var ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            that.tempImagePath = res.tempImagePath
            that.camera = 2
          }
        })
      } else if (that.camera == 2) {
        that.camera = 1
      }
    },
    submit () {
      var that = this
      wx.uploadFile({
        url: 'http://heziqiang.top:4710/user/confirm/uploadStudentPassPhoto',
        filePath: that.tempImagePath,
        name: 'file',
        formData: {
          skey: 'linzihao'
        },
        success (res) {
          console.log(res)
          //do something
        }
      })
      wx.showToast({
        title: '上传成功',
        icon: 'none',
        duration: 1500,
        complete: () => {
          let timeoutId = setTimeout(function () {
            clearTimeout(timeoutId)
            wx.hideToast()
          }, 1500)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.identification {
  .camera {
    margin: 104rpx 72rpx 94rpx;
    background-color: #fff;
    border-radius: 10rpx;

    > div {
      height: 364rpx;
    }
    > .flex-ccc {
      img {
        width: 80rpx;
        height: 80rpx;
      }

      div {
        font-size: 30rpx;
        letter-spacing: 4rpx;
        font-weight: bold;
        color: #909090;
      }
    }
    camera {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
      position: relative;
      button {
        position: absolute;
        bottom: 0rpx;
        width: 100%;
      }
    }
    > button {
      background-color: #fff;
      border-radius: 10rpx;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }
  }

  > button {
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
  background-color: #f6f3f3;
}
</style>
