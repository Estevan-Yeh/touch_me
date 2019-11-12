<template>
  <div>
    <div class="index-header">
      <div class="bc-theme">
        <img src="/static/index/background.png">
      </div>
      <div class="index-htitle">
        <img src="/static/index/htitle.png">
      </div>
      <div class="location">
        <img src="/static/index/location.png">
        <div class="index-search">
          <input
            type="text"
            confirm-type="search"
            placeholder="江门市蓬江区五邑大学"
            palceholder-class="input-search"
            disabled="true"
          >
        </div>
      </div>

      <div class="index-btn-entrance-box">
        <div>
          <div
            class="btn-sell"
            @tap="toSendReward"
          >
            <img src="/static/index/phone.png">
            <div class="normal-bold">发悬赏</div>
          </div>
          <div
            class="btn-gain"
            @tap="toPickReward"
          >
            <img src="/static/index/run.png">
            <div class="normal-bold">接悬赏</div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-dynamic">
      <div class="index-dtitle normal-bold">
        赏金动态
        <img src="/static/index/money.png">
      </div>
      <div class="index-list">
        <block
          v-for="(item,index) in indexList"
          :key="index"
        >
          <list-item
            :item="item"
            :tapItem="tapLitems"
          >
          </list-item>
        </block>
      </div>
    </div>

  </div>
</template>

<script>
import index from '@/store/index'
import details from '@/store/detailsOrder'
import rewardTypes from '@/store/rewardTypes'
import ListItem from '@/components/ListItem'

export default {
  components: {
    ListItem
  },
  data: function () {
    return {
      indexList: [],
      page: 1,
      count: 10,
      type: ''
    }
  },
  computed: {
    takeOrderList () {
      return index.state.orderList
    }
  },
  watch: {
    takeOrderList (val) {
      this.indexList = val
      this.indexList[1].urgent = 1
    }
  },
  methods: {
    tapLitems: function (item) {
      wx.navigateTo({
        url: '/pages/common/detailsOrder/main',
        success: function () {
          details.commit('setDetails', item)
          details.commit('setPhone', 0)
          if (item.status == 0) {
            details.commit('setButtonFooter', '我要抢单')
          } else {
            details.commit('setButtonFooter', '')
          }
        }
      })
    },
    toSendReward: function () {
      wx.navigateTo({ url: '/pages/index/sendReward/main' })
    },
    toPickReward: function () {
      wx.navigateTo({ url: '/pages/index/pickReward/main' })
    }
  },
  onReachBottom: function () {
    var that = this
    // console.log(this.page)
    that.$http.get("rewardsByPaging/" + that.page).then((res) => {
      // console.log('indexList', res)
      var data = res.data.data.rewardVoList
      timeString(data)
      index.commit('initOrderList', data)
      that.page += 1
    })
  },
  created: function () {
    this.indexList = index.state.orderList
    var that = this
    /* that.$http.post("rewardsByPaging/1", that.$qs.stringify({
    })).then((res) => {
      console.log('indexList', res.data.data.rewardList)
      index.commit('initOrderList', res.data.data.rewardList)
    }) */
    that.$http.get("rewardsByPaging/1").then((res) => {
      // console.log('indexList', res)
      that.page += 1
      var data = res.data.data.rewardVoList
      timeString(data)
      index.commit('initOrderList', data)
    })
    that.$http.get("rewardTypes").then((res) => {
      rewardTypes.commit('initRewardTypes', res.data.data.rewardTypeList)
      // console.log('rewardTypes', rewardTypes.state.rewardTypes)
    })
  },
}

function timeString (data) {
  var start = 0
  var end = 0
  data.forEach(item => {
    start = item.requireReceiveTime.indexOf('-') + 1
    end = item.requireReceiveTime.lastIndexOf(':')
    item.requireReceiveTime = item.requireReceiveTime.substring(start, end)
  })
}
</script>

<style lang="less" scoped>
/* @import '/src/style/txt.css'; */
.normal-bold {
  letter-spacing: 4rpx;
}
.index-header {
  .bc-theme {
    position: absolute;
    width: 100%;
    height: 316rpx;
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .index-htitle {
    text-align: center;
    padding-top: 54rpx;
    margin-bottom: 20rpx;
    img {
      width: 203rpx;
      height: 60rpx;
    }
  }
  .location {
    margin-left: 69rpx;
    display: flex;
    align-items: center;
    img {
      width: 44rpx;
      height: 54rpx;
      margin-right: 20rpx;
    }
    > div {
      font-size: 28rpx;
      font-weight: bold;
      color: #ababab;
      input {
        box-sizing: border-box;
        width: 410rpx;
        height: 46rpx;
        background-color: #ffffff;
        border-radius: 23rpx;
        opacity: 0.8;
        padding: 8rpx 32rpx;
        letter-spacing: 2rpx;
      }
    }
  }
  .index-btn-entrance-box {
    padding: 34rpx 54rpx;
    > div {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      border-radius: 10rpx;
      > div {
        flex: 1;
        text-align: center;
        padding-top: 43rpx;
        padding-bottom: 55rpx;
        color: #ababab;
      }
    }
    img {
      width: 159rpx;
      height: 159rpx;
    }
  }
}

.index-dynamic {
  background-color: #fff;
  .index-dtitle {
    padding-left: 67rpx;
    padding-top: 18rpx;
    padding-bottom: 30rpx;
    img {
      width: 42rpx;
      height: 37rpx;
      position: relative;
      top: 6rpx;
    }
  }
}
</style>

<style lang="wxss">
page {
  background-color: #f9f7f7 !important;
}
</style>
