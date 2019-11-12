<template>
  <div @tap="titlePickerHide">
    <header-view title="发悬赏"></header-view>

    <div
      class="fabu-success"
      v-if="!fabu"
    >
      <image
        src="/static/fabu-success.png"
        mode="widthFix"
      />
    </div>

    <div
      class="sr-table"
      v-if="fabu"
    >
      <div
        class="sr-title"
        @tap.stop="tapTitle"
      >
        <input
          type="text"
          v-model="title"
          focus="true"
          disabled="true"
        >
        <!-- <input
          type="text"
          v-model="title"
          v-else
        > -->
        <!-- <div>{{title}}</div> -->
        <img src="/static/detailsOrder/unfold.png">
      </div>

      <div
        class="sr-title-picker"
        @tap.stop=""
        :class="titlePickerShow?'show':'hide'"
      >
        <block
          v-for="(item,index) in titlePicker"
          :key="index"
        >
          <div
            :class="[
            titleIndex==index?'title-active':'',
            index==0?'title_1':'',
            index==end?'title_end':''
            ]"
            @tap="titleActive(index)"
          >
            {{item.name}}
          </div>
        </block>
      </div>

      <div class="sr-textarea txt-mid">
        <textarea
          v-if="!titlePickerShow"
          maxlength="-1"
          :placeholder="hint"
          v-model="detail"
        />
        </div>
  

      <div class="do-pos normal-bold">
        <div class="do-pos_1">
          <img src="/static/detailsOrder/pos-start.png">
          <div><input placeholder="请输入起始地" v-model="startAddress" /></div>
        </div>
        <div>
          <img src="/static/detailsOrder/pos-end.png">
          <div><input placeholder="请输入送达地点" v-model="endAddress" /></div>
        </div>
      </div>

      <div class="sr-money">
        <div class="money-input">悬赏金额：<input v-model="money" /></div>
        <div>元</div>
      </div>

      <div class="sr-urgent">
        <div class="money-input">加急</div>
        <div><radio color="#ff0202" :checked="urgent" @tap="tapRadio"/></div>
      </div>


      <div class="do-tip txt-mid">
        <div class="do-tip_1">
          <img src="/static/detailsOrder/weight.png">
          <div><input placeholder="请输入联系电话" class="normal-bold" v-model="phone" /></div>
        </div>
        <div class="do-tip_2">
          <img src="/static/detailsOrder/time.png"> 
          <div>
            <!-- <input placeholder="请输入送达时间" /> -->
            <div class="mp-picker">
              <div @click="showTimePicker" class="normal-bold">{{time}} 前送达</div>
              <mpvue-picker
                ref="timePicker"
                mode="multiSelector"
                deepLength="3"
                :pickerValueDefault="pickerTimeDefault"
                @onConfirm="onConfirmT"
                :pickerValueArray="pickerTimeArray"
              >
              </mpvue-picker>
            </div>
          </div>
        </div>
        
        <div class="do-tip_2">
          <img src="/static/detailsOrder/weight.png">
          <!-- <div><input placeholder="重量" class="normal-bold" /></div> -->
          <div class="mp-picker">
              <div @click="showWeightPicker" class="normal-bold">{{weight}} kg</div>
              <mpvue-picker
                ref="weightPicker"
                mode="multiSelector"
                :pickerValueDefault="pickerWeightDefault"
                @onConfirm="onConfirmW"
                :pickerValueArray="pickerWeightArray"
              >
              </mpvue-picker>
          </div>
        </div>
        <!-- <div class="do-tip_3">
          <img src="/static/detailsOrder/tip.png">
          <div>
            <textarea
              auto-height="true"
              placeholder="小贴士..."
            />
          </div>
        </div> -->
      </div>

    </div>

    <div class="do-footer" v-if="fabu" @tap="fabuActive">
      <button>发布悬赏</button>
    </div>

  </div>
</template>

<script>
import rewardTypes from '@/store/rewardTypes'
import address from '@/store/address'
import HeaderView from '@/components/Header'
import mpvuePicker from 'mpvue-picker'

export default {
  components: {
    HeaderView,
    mpvuePicker
  },
  data: function () {
    return {
      title: '帮我取',
      titleFocus: false,
      titlePicker: [],
      hint: '',
      titleIndex: 0,
      end: 5,
      titlePickerShow: false,
      urgent: false,
      fabu: true,
      detail: '',
      startAddress: '',
      endAddress: '',
      money: '3',
      phone: '',
      pickerTimeArray: [
        [],
        [],
        []
      ],
      pickerTimeDefault: [],
      time: '',
      requireReceiveTime: '',
      pickerWeightArray: [
        [
          {
            label: '0-1 kg',
            value: '0-1'
          },
          {
            label: '1-3 kg',
            value: '1-3'
          },
          {
            label: '3-6 kg',
            value: '3-6'
          },
          {
            label: '6-10 kg',
            value: '6-10'
          }
        ]
      ],
      pickerWeightDefault: [0],
      weight: '0',
      weightCode: ''
    }
  },
  computed: {
    takeRewardTypes () {
      return rewardTypes.state.rewardTypes
    },
    getAddress () {
      return address.state.defaultAddress
    }
  },
  watch: {
    takeRewardTypes (val) {
      this.titlePicker = val
      this.hint = val[0].hint
    },
    getAddress (val) {
      this.endAddress = val.dormAddress
      this.phone = val.phoneNumber
    }
  },
  onShow: function () {
    this.titlePickerShow = false
    this.fabu = true
    var date = new Date()
    this.time = '今天' + ' ' + date.getHours() + ':' + date.getMinutes()
    // this.time = date.getMonth() + 1 + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getSeconds()
    // date.setDate(date.getDate() + 30)
    // console.log('s', date)
  },
  methods: {
    goback: function () {
      wx.navigateBack({ delta: 1 })
    },
    tapTitle: function () {
      this.titlePickerShow = !this.titlePickerShow
    },
    titleActive: function (index) {
      this.titleIndex = index
      this.title = this.titlePicker[index].name
      this.titlePickerShow = false

      /* if (index == this.titlePicker.length - 1) {
        this.titleFocus = true
      } else {
        this.titleFocus = false
      } */

      this.hint = this.titlePicker[index].hint
    },
    titlePickerHide: function () {
      if (this.titlePickerShow)
        this.titlePickerShow = false
    },
    tapRadio: function () {
      this.urgent = !this.urgent
    },
    fabuActive: function () {
      var that = this
      var date = new Date()
      if (that.requireReceiveTime == '') {
        that.requireReceiveTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        // console.log(this.requireReceiveTime)
      }
      that.$http.post("reward/heziqiang", {
        typeCode: that.titleIndex + 1,
        detail: that.detail,
        startAddress: that.startAddress,
        endAddress: that.endAddress,
        requireReceiveTime: that.requireReceiveTime,
        money: that.money,
        urgent: that.urgent ? 1 : 0,
        couponId: null,
        genderCode: 0,
        weightCode: that.weightCode
      }).then((res) => {
        // console.log('res', res.data)
        that.fabu = false
      }).catch((error) => { console.log(error.status) })

    },
    showTimePicker: function () {
      var date = new Date()
      var date1 = new Date()

      var days = [
        {
          label: '今天',
          value: '今天'
        },
        {
          label: '明天',
          value: '明天'
        }
      ]

      var month = 0
      for (var i = 2; i < 7; i++) {
        var day = {}
        date1.setDate(date.getDate() + i)
        month = date1.getMonth() + 1
        day.label = '' + month + '月' + date1.getDate() + '日'
        day.value = '' + month + '-' + date1.getDate()
        days.push(day)
      }

      var hours = []
      for (var i = 0; i < 24; i++) {
        var hour = {}
        hour.label = '' + (Array(2).join(0) + i).slice(-2) + '时'
        hour.value = '' + (Array(2).join(0) + i).slice(-2)
        hours.push(hour)
      }

      var minutes = []
      for (var i = 0; i < 60; i++) {
        var minute = {}
        minute.label = '' + (Array(2).join(0) + i).slice(-2) + '分'
        minute.value = '' + (Array(2).join(0) + i).slice(-2)
        minutes.push(minute)
      }

      this.pickerTimeArray[0] = days
      this.pickerTimeArray[1] = hours
      this.pickerTimeArray[2] = minutes

      var pickerTimeDefault = []
      pickerTimeDefault[0] = 0
      for (var i = 0; i < hours.length; i++) {
        if (date.getHours() == hours[i].value)
          break;
      }
      pickerTimeDefault[1] = i
      for (var i = 0; i < minutes.length; i++) {
        if (date.getMinutes() == minutes[i].value)
          break;
      }
      pickerTimeDefault[2] = i
      this.pickerTimeDefault = pickerTimeDefault

      this.$refs.timePicker.show()
    },
    onConfirmT: function (e) {
      // console.log(e)
      var date = new Date()
      this.time = '' + e.value[0] + ' ' + e.value[1] + ':' + e.value[2]
      if (e.index[0] < 2) {
        var date1 = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
      } else {
        var date1 = date.getFullYear() + '-' + e.value[0]
      }
      this.requireReceiveTime = date1 + ' ' + e.value[1] + ':' + e.value[2] + ':' + date.getSeconds()
      // console.log(this.requireReceiveTime)
    },
    showWeightPicker: function () {
      this.$refs.weightPicker.show()
    },
    onConfirmW: function (e) {
      // console.log(e)
      this.weight = '' + e.value
      this.weightCode = '' + e.index[0]
      console.log(this.weightCode)
    }
  }
}
</script>

<style lang="less" scoped>
/* input.normal-bold {
  color: #ababab;
} */
.txt-placeholder {
  font-size: 33rpx;
  font-weight: bold;
  letter-spacing: 5rpx;
}
.fabu-success image {
  width: 100%;
}

.sr-table {
  padding: 0 60rpx;
  > div {
    background-color: #fff;
  }
  .sr-title {
    border-radius: 30rpx;
    margin-top: 22rpx;
    padding: 24rpx 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div,
    input {
      font-size: 33rpx;
      font-weight: bold;
      letter-spacing: 5rpx;
    }
    img {
      width: 41rpx;
      height: 15rpx;
    }
  }
  .sr-title-picker {
    background-color: rgba(220, 220, 220, 0.62);
    border-radius: 30px;
    position: absolute;
    z-index: 111;
    width: 630rpx;
    div {
      padding: 12rpx 40rpx;
      font-size: 33rpx;
      font-weight: bold;
      letter-spacing: 5rpx;
    }
    &.show {
      animation: show 500ms ease normal;
    }
    &.hide {
      display: none;
      animation: hide 100ms ease normal;
    }
    .title-active {
      background-color: #fce300;
    }
    .title_1 {
      padding-top: 25rpx;
      padding-bottom: 20rpx;
    }
    .title_end {
      padding-bottom: 25rpx;
    }
  }
  .sr-textarea {
    border-radius: 20rpx;
    padding: 36rpx 40rpx;
    margin-top: 46rpx;
    height: 200rpx;
    textarea {
      width: 560rpx;
      height: 200rpx;
    }
  }
  .do-pos {
    border-radius: 20rpx;
    padding: 8rpx 0;
    margin-top: 24rpx;
    > div {
      display: flex;
      align-items: center;
      padding: 14rpx 16rpx;
      input {
        width: 520rpx;
      }
    }
    img {
      width: 56rpx;
      height: 68rpx;
      margin-right: 17rpx;
    }
    .do-pos_1 {
      border-bottom: 1rpx solid #eae9e9;
    }
  }
  .sr-money,
  .sr-urgent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 33rpx;
    font-weight: bold;
    letter-spacing: 5rpx;
    margin-top: 26rpx;
    padding: 24rpx 42rpx;
    border-radius: 30rpx;
  }
  .money-input {
    display: flex;
    align-items: center;
    flex-basis: 100%;
    input {
      flex-basis: 60%;
      color: #ff0202;
    }
  }
  .sr-urgent {
    color: #ff0202;
    margin-bottom: 26rpx;
  }
  .do-tip {
    padding: 28rpx 74rpx 74rpx 28rpx;
    border-radius: 20rpx;
    min-width: 300rpx;
    > div {
      display: flex;
      align-items: center;
    }
    .do-tip_1 img {
      width: 46rpx;
      height: 46rpx;
      margin-right: 17rpx;
    }
    .do-tip_2 {
      margin-top: 19rpx;
      img {
        width: 41rpx;
        height: 41rpx;
        margin-right: 20rpx;
        margin-left: 2rpx;
      }
    }
    .do-tip_3 {
      margin-top: 21rpx;
      img {
        width: 40rpx;
        height: 45rpx;
        margin-right: 22rpx;
        align-self: flex-start;
        margin-left: 3rpx;
      }
      textarea {
        width: 456rpx;
      }
    }
  }
}

.do-footer {
  margin-top: 80rpx;
  width: 100%;
  margin-bottom: 160rpx;
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
}
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

<style lang="wxss">
page {
  background-color: #f9f7f7 !important;
}
</style>
