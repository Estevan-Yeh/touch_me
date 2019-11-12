<template>
  <div>
    <header-view title="接悬赏"></header-view>

    <div class="order-tab order-tab_0">
      <block
        v-for="(item, index) in orderTab_0"
        :key="index"
      >
        <div @tap="tabActive_0(index)">
          <div class="t0-title">
            <img
              v-if="index==0"
              class="img-anxious"
              src="/static/detailsOrder/anxious.png"
            >
            {{item}}
          </div>
          <div :class="urgent==index?'order-tab-active':''"></div>
        </div>
      </block>
    </div>
    <div class="order-tab order-tab_1">
      <block
        v-for="(item, index) in orderTab_1"
        :key="index"
      >
        <div @tap="tabActive_1(index)">
          <div>{{item.name}}</div>
          <div :class="typeCode==index?'order-tab-active':''"></div>
        </div>
      </block>
    </div>
    <div class="index-list">
      <block
        v-for="(item,index) in pickList"
        :key="index"
      >
        <div>
          <list-item
            :item="item"
            :tapItem="tapLitems"
          ></list-item>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
import pick from '@/store/pickReward'
import details from '@/store/detailsOrder'
import rewardTypes from '@/store/rewardTypes'
import HeaderView from '@/components/Header'
import ListItem from '@/components/ListItem'

export default {
  components: {
    HeaderView,
    ListItem
  },
  data: function () {
    return {
      orderTab_0: [
        "加急",
        "非加急"
      ],
      orderTab_1: [
      ],
      urgent: 0,
      typeCode: 0,
      pickList: [],
      page: 1
    }
  },
  computed: {
    takeRewardTypes () {
      return rewardTypes.state.rewardTypes
    },
    takePickList () {
      return pick.state.orderList
    }
  },
  watch: {
    takeRewardTypes (val) {
      this.orderTab_1 = val
    },
    takePickList (val) {
      this.pickList = val
      console.log(this.pickList)
    },
    urgent (val) {
      getPick(this)
    },
    typeCode (val) {
      getPick(this)
    }
  },
  onShow: function () {
    getPick(this)
  },
  onReachBottom: function () {
    var that = this
    // console.log(this.page)
    that.$http.get("rewardsByPaging/" + that.page).then((res) => {
      // console.log('addList', res)
      var data = res.data.data.rewardVoList
      timeString(data)
      pick.commit('addList', data)
      that.page += 1
    })
  },
  methods: {
    tabActive_0: function (index) {
      var that = this
      that.urgent = index
    },
    tabActive_1: function (index) {
      var that = this
      that.typeCode = index
    },
    tapLitem: function (index) {
      var that = this
      that.indexList[index].litemFinish = !that.indexList[index].litemFinish
    },
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
    goback: function () {
      wx.navigateBack({ delta: 1 })
    }
  }
}
function getPick (that) {
  that.$http.get("rewardsByPaging/1", {
    urgent: that.urgent == 0 ? 1 : 0,
    typeCode: that.typeCode + 1
  }).then((res) => {
    // console.log('pickReward', res.data.data)
    that.page = 2
    var data = res.data.data.rewardVoList
    timeString(data)
    pick.commit('setList', data)
  }).catch((error) => { })
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

<style scoped>
.order-tab {
  display: flex;
  border-bottom: #e7e5e5 solid 1rpx;
}
.order-tab > div {
  flex: 1;
  font-size: 28rpx;
  letter-spacing: 4rpx;
  color: #707070;
  text-align: center;
}
.order-tab-active {
  width: 61rpx;
  height: 4rpx;
  background-color: #ffe300;
  margin: 0 auto;
}
.order-tab.order-tab_0 > div {
  font-size: 35rpx;
  padding-top: 20rpx;
}
.order-tab.order-tab_0 > div > .t0-title {
  height: 48rpx;
}
.order-tab.order-tab_1 > div {
  padding-top: 14rpx;
  font-size: 28rpx;
}
.order-tab_0 .img-anxious {
  width: 26rpx;
  height: 38rpx;
  position: relative;
  top: 8rpx;
  left: 8rpx;
}
</style>

<style lang="wxss">
page {
  background-color: #f0f0f0;
}
</style>
