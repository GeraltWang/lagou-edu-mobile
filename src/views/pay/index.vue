<template>
  <div class="pay">
    <van-cell-group>
      <van-cell class="course-info">
        <img :src="course.courseImgUrl" alt="">
        <div class="price">
          <div class="course-name">{{ course.courseName }}</div>
          <div class="discounts">￥{{ course.discounts }}</div>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <div class="buy-info">购买信息</div>
        <div>购买课程后使用此账号登录【拉钩教育】学习课程</div>
        <div class="user-name">当前账号：{{ userName }}</div>
      </van-cell>
      <!-- 支付功能 -->
      <van-cell class="payment">
        <div class="title">
          <p>支付方式</p>
          <van-radio-group v-model="radio" checked-color="#fbc546">
            <van-cell-group>
              <van-cell clickable @click="radio = '1'">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png">
                  <span>微信支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell clickable @click="radio = '2'">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png">
                  <span>支付宝支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <!-- 支付按钮 -->
        <!-- <van-button @click="gopay" color="linear-gradient(to right, #faa83e, #fbc546)">￥{{ course.discounts }} 立即支付</van-button> -->
      </van-cell>
    </van-cell-group>
    <van-button @click="gopay" color="linear-gradient(to right, #faa83e, #fbc546)">￥{{ course.discounts }} 立即支付</van-button>
  </div>
</template>

<script>
import { Cell, CellGroup, Radio, RadioGroup, Button, Toast } from 'vant'
import { getCourseById } from '@/services/course'
import { createOrder, getPayInfo, saveOrder, getPayResult } from '@/services/pay'

export default {
  name: 'Pay',
  components: {
    VanCell: Cell,
    VanCellGroup: CellGroup,
    VanRadio: Radio,
    VanRadioGroup: RadioGroup,
    VanButton: Button
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      course: {},
      radio: 2,
      // 订单号
      orderNumber: null
    }
  },
  created () {
    this.loadCourse()
    this.loadOrder()
  },
  methods: {
    // 加载课程信息
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    },
    // 创建订单
    async loadOrder () {
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      console.log(data)
      this.orderNumber = data.content.orderNo
      // 获取支付方式
      const { data: payInfo } = await getPayInfo({
        shopOrderNo: this.orderNumber
      })
      console.log(payInfo)
    },
    async gopay () {
      const { data } = await saveOrder({
        goodsOrderNo: this.orderNumber,
        channel: this.radio === '1' ? 'weChat' : 'aliPay',
        returnUrl: 'http://edufront.lagou.com'
      })
      console.log(data)
      // 接受响应地址并跳转
      window.location.href = data.content.payUrl
      const timer = setInterval(async () => {
        // 发起查询支付结果的请求
        const { data: payResult } = await getPayResult({
          orderNo: data.content.orderNo
        })
        console.log(payResult)
        if (payResult.content.status === 2) {
          clearInterval(timer)
          Toast.success('支付成功')
          this.$router.push({ name: 'learn' })
        }
      }, 700)
    }
  },
  computed: {
    // 用户名处理
    userName () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}
</script>

<style lang="scss" scoped>
.pay{
  // height: 100vh;
  position: absolute;
  height: 100%;
  width: 100%;
  .van-cell-group{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .course-info{
      height: 170px;
      padding: 40px 20px 0;
      margin-bottom: 10px;
      .van-cell__value{
        display: flex;
        img{
          width: 80px;
          height: 107px;
          border-radius: 10px;
        }
        .price{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 107px;
          padding: 5px 20px;
          box-sizing: border-box;
          .course-name{
            font-size: 16px;
          }
          .discounts{
            font-size: 20px;
            font-weight: bold;
            color: #ff7452;
          }
        }
      }
    }
    .account-info{
      height: 120px;
      margin-bottom: 10px;
      div:nth-child(2){
        font-size: 12px;
        color: #999;
      }
      .user-name{
        margin: 20px 0 10px;
        font-size: 16px;
      }
    }
    .payment{
      flex: 1;
      .van-cell__value{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .van-cell__title{
          display: flex;
          align-items: center;
          img{
            width: 28px;
            height: 28px;
          }
        }
        .van-cell{
          padding: 20px 10px;
          span{
            font-size: 16px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .van-button{
    position: absolute;
    width: 330px;
    bottom: 10px;
    left: 50%;
    margin-left: -165px;
  }
}
</style>
