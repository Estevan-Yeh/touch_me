<template>
  <div>
    <div class="do-header">
      <img
        src="/static/detailsOrder/return.png"
        @tap="goback"
      >
      接悬赏
    </div>
    <div class="order-tab order-tab_0">
      <block
        v-for="(item, index) in orderTab_0"
        :key="index"
      >
        <div @tap="tabActive_0(index)">
          <div>
            <img
              v-if="index==0"
              class="img-anxious"
              src="/static/detailsOrder/anxious.png"
            >
            {{item}}
          </div>
          <div :class="otActive_0==index?'order-tab-active':''"></div>
        </div>
      </block>
    </div>
    <div class="order-tab order-tab_1">
      <block
        v-for="(item, index) in orderTab_1"
        :key="index"
      >
        <div @tap="tabActive_1(index)">
          <div>{{item}}</div>
          <div :class="otActive_1==index?'order-tab-active':''"></div>
        </div>
      </block>
    </div>
    <div class="index-list">
      <block
        v-for="(item,index) in indexList"
        :key="index"
      >
        <div
          class="index-list-item"
          @tap="tapLitems"
        >
          <div class="index-litme-content">
            <div>
              <span class="normal-bold">{{item.type}}</span>
              <span class="mid-bold">{{item.content}}</span>
            </div>
            <div class="txt-sm">　{{item.time}} {{item.pos}}</div>
          </div>
          <div
            class="index-litem-tip"
            :class="item.litemFinish?'index-finish':''"
            @tap.stop="tapLitem(index)"
          >
            <div class="ilt-bg"><img src="/static/index/finish.png"></div>
            <div class="txt-sm">赏金：<span class="txt-theme-color">￥<span class="txt-mid">{{item.money}}</span></span></div>
            <div class="mid-bold">待确认</div>
          </div>
        </div>
      </block>
    </div>

    <div
      class="index-list-item"
      @tap="tapLitems(item)"
    >
      <div class="index-litme-content">
        <div>
          <img
            v-if="urgent==0"
            class="img-anxious"
            src="/static/detailsOrder/anxious.png"
          >
          <span class="normal-bold">【{{item.type}}】</span>
          <!-- v-if="item.anxious==1" -->
          <span
            class="txt-anxious mid-bold"
            v-if="urgent==0"
          >急!!！</span>
          <span class="txt-mid">{{item.detail}}</span>
        </div>
        <div class="txt-sm">　{{item.time}} {{item.endAddress}}</div>
      </div>
      <div
        class="index-litem-tip"
        :class="item.litemFinish?'index-finish':''"
        @tap.stop="tapLitem(index)"
      >
        <div class="ilt-bg"><img src="/static/index/finish.png"></div>
        <div class="txt-sm">赏金：<span class="txt-theme-color">￥<span class="txt-mid">{{item.money}}</span></span></div>
        <div class="mid-bold">待接单</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      orderTab_0: [
        "加急",
        "非加急"
      ],
      orderTab_1: [
        "帮我取",
        "帮我送",
        "陪学习",
        "陪我玩"
      ],
      otActive_0: 0,
      otActive_1: 0,
      indexList: [
        {
          type: "【帮我取】",
          content: "置和超市，有人能帮我在在在在",
          time: "19/07/24 15:21",
          pos: "五邑大学女生宿舍24栋314",
          money: 0,
          litemFinish: true
        },
        {
          type: "【帮我买】",
          content: "置和超市，有人能帮我在在",
          time: "19/07/24 15:21",
          pos: "五邑大学女生宿舍24栋314",
          money: 1,
          litemFinish: false
        },
        {
          type: "【帮我取】",
          content: "置和超市",
          time: "19/07/24 15:21",
          pos: "五邑大学女生宿舍24栋314",
          money: 2,
          litemFinish: false
        },
        {
          type: "【帮我取】",
          content: "置和超市，有人能帮我在",
          time: "19/07/24 15:21",
          pos: "五邑大学女生宿舍24栋314",
          money: 3,
          litemFinish: true
        },
        {
          type: "【帮我取】",
          content: "置和超市，有人能帮我在",
          time: "19/07/24 15:21",
          pos: "五邑大学女生宿舍24栋314",
          money: 4,
          litemFinish: false
        }
      ]
    }
  },
  methods: {
    tabActive_0: function (index) {
      var that = this
      that.otActive_0 = index
    },
    tabActive_1: function (index) {
      var that = this
      that.otActive_1 = index
    },
    tapLitem: function (index) {
      var that = this
      that.indexList[index].litemFinish = !that.indexList[index].litemFinish
    },
    tapLitems: function (index) {
      wx.navigateTo({ url: '../detailsOrder/main' })
    },
    goback: function () {
      wx.navigateBack({ url: 1 })
    }

  }

}
</script>

<style scoped>
.do-header {
  box-sizing: border-box;
  padding-left: 51rpx;
  padding-right: 51rpx;
  padding-top: 60rpx;
  padding-bottom: 31rpx;
  text-align: center;
  letter-spacing: 4rpx;
  color: #010101;
  font-size: 38rpx;
  line-height: 32rpx;
  border-bottom: 1rpx solid #e7e5e5;
}
.do-header img {
  width: 22rpx;
  height: 36rpx;
  float: left;
}
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
.order-tab.order-tab_1 > div {
  padding-top: 14rpx;
  font-size: 28rpx;
}
.img-anxious {
  width: 26rpx;
  height: 38rpx;
  position: relative;
  top: 8rpx;
  left: 8rpx;
}

.index-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 38rpx 58rpx 35rpx 45rpx;
  border-top: #e9e9e9 1rpx solid;
  margin-top: 26rpx;
  background-color: #fff;
}
.index-list-item .txt-sm {
  color: #ababab;
}
.index-litme-content > div {
  max-width: 520rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index-litme-content .txt-sm {
  margin-top: 14rpx;
}
.index-litem-tip .mid-bold {
  background-color: #d1d0d0;
  border-radius: 10rpx;
  color: #888;
  padding-top: 2rpx;
  padding-right: 8rpx;
  padding-bottom: 4rpx;
  padding-left: 12rpx;
  margin-top: 10rpx;
}
.ilt-bg {
  display: none;
}
.index-finish > div.ilt-bg {
  display: inline;
  position: absolute;
  bottom: -18rpx;
  right: -40rpx;
  opacity: 0.9;
}
.index-finish img {
  width: 192rpx;
  height: 119rpx;
}
.index-finish {
  position: relative;
}
.index-finish > div {
  position: relative;
}
.index-finish > .mid-bold {
  visibility: hidden;
}
</style>

<style lang="wxss">
page {
  background-color: #f0f0f0;
}
</style>
