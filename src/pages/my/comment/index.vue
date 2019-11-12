<template>
  <div>
    <header-view
      title="我的评价"
      :goback="goback"
    ></header-view>
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
    <div
      v-for="(item,index) in commentList"
      :key="index"
    >
      <comment-item
        :item="item"
        :tapItem="tapComment"
      ></comment-item>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/Header'
import CommentItem from '@/components/CommentItem'
import comment from '@/store/comment'

export default {
  components: {
    HeaderView,
    CommentItem
  },
  data: function () {
    return {
      orderTab: [
        "收到的评价",
        "发布的评价"
      ],
      otActive: 0,
      commentList: []
    }
  },
  onReady () {
    var that = this
    this.otActive = 0
    that.$http.get('receivedComment/heziqiang').then((res) => {
      that.commentList = res.data.data.commentVoList
      consoel.log(that.commentList)
    }).catch((error) => { })
  },
  methods: {
    tabActive: function (index) {
      var that = this
      if (index == 0) {
        var url = "receivedComment/"
      } else {
        var url = "publishedComment/"
      }
      that.$http.get(url + 'heziqiang').then((res) => {
        console.log('commentList', res)
        that.commentList = res.data.data.commentVoList
        that.otActive = index
      }).catch((error) => { })
    },
    tapComment: function (item) {
      comment.commit('initCommentDetails', item)
      wx.navigateTo({ url: '/pages/common/commentDetails/main' })
    },
    goback: function () {
      wx.navigateBack({ url: '/pages/my/index/main' })
    }
  }
}
</script>

<style>
.order-tab {
  display: flex;
  border-bottom: #e7e5e5 solid 1rpx;
  padding-top: 10rpx;
}
.order-tab > div {
  flex: 1;
  font-size: 35rpx;
  letter-spacing: 4rpx;
  color: #707070;
  text-align: center;
}
.order-tab-active {
  width: 110rpx;
  height: 4rpx;
  background-color: #ffe300;
  margin: 0 auto;
}
</style>

<style lang="wxss">
page {
  background-color: #f0f0f0;
}
</style>
