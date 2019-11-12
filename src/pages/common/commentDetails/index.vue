<template>
  <div>
    <header-view title="评价详情"></header-view>

    <div class="comment-details">
      <div class="flex-c">
        <img :src="commentDetails.avatarUrl">
        <div class="txt-mid">{{commentDetails.username}}</div>
      </div>
      <div class="em">
        <div class="font-tip">
          {{commentDetails.publishTime}} 【{{commentDetails.rewardTypeName}}】
        </div>
        <div class="flex-c">
          <div class="font-tip">打分</div>
          <div class="stars">
            <img
              v-for="(star, index) in 5"
              :key="index"
              :src="index<commentDetails.starNumber?'/static/images/star_fill.png':'/static/images/star.png'"
            >
          </div>
        </div>
        <div class="comment">{{commentDetails.detail}}</div>
        <div
          class="order flex"
          @tap="toDetailsOrder(item)"
        >
          <div>
            <div class="flex-c">
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
          <div>
            <div class="txt-sm money">
              赏金：<span class="txt-theme-color">￥<span class="txt-mid">{{item.money}}</span></span>
            </div>
            <img
              class="finish"
              src="/static/index/finish.png"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/Header'
import ListItem from '@/components/ListItem'
import comment from '@/store/comment'
import details from '@/store/detailsOrder'

export default {
  components: {
    HeaderView,
    ListItem
  },
  data: function () {
    return {
      items: {
        id: 38,
        publisherId: 3,
        type: "其他",
        detail: "电脑坏了，有人会修吗",
        startAddress: "无",
        endAddress: "19-424",
        requireReceiveTime: "2019-09-22 08:00:00",
        money: 20.0,
        urgent: 0,
        couponId: null,
        genderCode: 0,
        weightCode: 0,
        publishTime: "2019-09-21T06:32:53.000+0000",
        status: 0
      },
      item: {
        urgent: 1,
        type: 'sss',
        detail: '22222222222222',
        requireReceiveTime: '333',
        money: '3',
        endAddress: '444'
      }
    }
  },
  computed: {
    commentDetails () {
      return comment.state.commentDetails
    }
  },

  onShow: function () {
    var that = this
    that.$http.get("reward/id/" + that.commentDetails.rewardId).then((res) => {
      this.item = res.data.data
    })
  },
  methods: {
    goback: function () {
      wx.navigateBack({ delta: 1 })
    },
    toDetailsOrder: function (item) {
      wx.navigateTo({
        url: '/pages/common/detailsOrder/main',
        success: function () {
          details.commit('setDetails', item)
          details.commit('setPhone', 1)
          if (item.status == 0) {
            details.commit('setButtonFooter', '我要抢单')
          } else {
            details.commit('setButtonFooter', '')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.font-tip {
  font-family: MicrosoftYaHei;
  font-size: 20rpx;
  letter-spacing: 2rpx;
  color: #aeacac;
  margin-right: 16rpx;
}
.stars {
  img {
    width: 30rpx;
    height: 30rpx;
  }
}
.comment {
  font-family: MicrosoftYaHei;
  font-size: 28rpx;
  letter-spacing: 2rpx;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.comment-details {
  @img-wh: 72rpx;
  @img-mr: 20rpx;
  padding: 48rpx 30rpx;
  border-bottom: 1rpx solid #eae9e9;
  > .flex-c {
    color: #707070;
    img {
      width: @img-wh;
      height: @img-wh;
      margin-right: @img-mr;
    }
  }
  > .em {
    padding-left: @img-wh + @img-mr;
  }
}
.order {
  border-radius: 10rpx;
  position: relative;
  width: 570rpx;
  margin-top: 20rpx;
  background-color: #efeeee;
  padding: 20rpx 20rpx 20rpx 48rpx;
  justify-content: space-between;
  box-sizing: border-box;
  .txt-sm {
    color: #ababab;
  }
  img.urgent {
    width: 24rpx;
    height: 38rpx;
    position: absolute;
    margin-left: -16rpx;
    margin-top: 8rpx;
  }
  span.urgent {
    font-size: 28rpx;
    font-weight: bold;
    letter-spacing: 4rpx;
    color: #fc0303;
  }
  .flex-c {
    width: 340rpx;
    margin-right: 10rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .money {
    width: 164rpx;
  }
  img.finish {
    width: 124rpx;
    height: 78rpx;
    position: absolute;
    bottom: 16rpx;
    right: 62rpx;
    opacity: 0.7;
    z-index: 1;
  }
}
</style>
