<template>
  <div>
    <div class="order-header">订单</div>
    <div class="order-tab">
      <block
        v-for="(item, index) in orderTab"
        :key="index"
      >
        <div @tap="tabActive(index)">
          <div>{{item}}</div>
          <div :class="otActive==index?'order-tab-active':''"></div>
        </div>
      </block>
    </div>
    <div class="index-list">
      <block
        v-for="(item,index) in indexList"
        :key="index"
      >
        <div>
          <list-item
            :item="item"
            :tapItem="tapLitems"
          >
          </list-item>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
import order from '@/store/order'
import details from '@/store/detailsOrder'
import ListItem from '@/components/ListItem'

export default {
  components: {
    ListItem
  },
  data: function () {
    return {
      orderTab: [
        "接单",
        "发布"
      ],
      otActive: 0,
      indexList: []
    }
  },
  computed: {
    takeOrderList () {
      return order.state.orderList
    }
  },
  watch: {
    takeOrderList (val) {
      this.indexList = val
      // console.log(val)
    }
  },
  onReady: function () {
    this.$http.get("receivedOrder/linzihao").then((res) => {
      // console.log('orderList', res.data.data.orderVoList)
      var data = res.data.data.orderVoList
      timeString(data)
      order.commit('initOrderList', data)
    }).catch((error) => { })
  },
  methods: {
    tabActive: function (index) {
      var that = this
      // console.log(index)
      if (index == 0) {
        var url = "receivedOrder/linzihao"
      } else {
        var url = "publishedOrder/heziqiang"
      }

      this.$http.get(url).then((res) => {
        // console.log('orderList', res.data.data.orderVoList)
        var data = res.data.data.orderVoList
        timeString(data)
        order.commit('initOrderList', data)
      }).catch((error) => { })
      that.otActive = index
    },
    tapLitems: function (item) {
      wx.navigateTo({
        url: '/pages/common/detailsOrder/main',
        success: function () {
          details.commit('setDetails', item)
          details.commit('setPhone', 1)
          details.commit('setButtonFooter', '确认订单')
        }
      })
    },
    tapCancel: function () {
      // console.log('tapCancel')
    }
  }
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
.order-header {
  text-align: center;
  font-size: 38rpx;
  letter-spacing: 4rpx;
  color: #010101;
  border-bottom: #e7e5e5 solid 1rpx;
  padding-top: 48rpx;
  padding-bottom: 32rpx;
  margin-bottom: 28rpx;
}
.order-tab {
  display: flex;
  border-bottom: #e7e5e5 solid 1rpx;
  > div {
    flex: 1;
    font-size: 35rpx;
    letter-spacing: 4rpx;
    color: #707070;
    text-align: center;
    .order-tab-active {
      width: 61rpx;
      height: 4rpx;
      background-color: #ffe300;
      margin: 0 auto;
    }
  }
}

.index-list > div {
  margin-top: 26rpx;
}

.cancel-order {
  color: #ababab;
  padding-right: 20rpx;
  text-align: right;
}
</style>

<style lang="wxss">
page {
  background-color: #f0f0f0;
}
</style>
