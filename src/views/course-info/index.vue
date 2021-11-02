<template>
  <div class="course-info">
    <!-- {{courseId}} -->
    <van-cell-group :border="false" :style="styleOpts">
        <!-- 头部图片 -->
        <van-cell class="course-img">
            <img :src="course.courseImgUrl">
        </van-cell>
        <!-- 课程描述 -->
        <van-cell class="course-desc">
            <!-- 课程名称 -->
            <h3 v-text="course.courseName"></h3>
            <!-- 课程概述 -->
            <p v-text="course.previewFirstField"></p>
            <!-- 销售信息 -->
            <div class="course-sale">
                <p class="price">
                    <span class="discounts">￥{{ course.discounts }}</span>
                    <s>￥{{ course.price }}</s>
                </p>
                <span class="tag">{{ course.sales }}人已购</span>
                <span class="tag">有空就更新</span>
            </div>
        </van-cell>
        <!-- 选项卡 -->
        <van-cell class="course-details">
          <van-tabs sticky scrollspy>
            <van-tab title="详情">
              <!-- 课程详情信息在后台是通过富文本编辑器设置的 -->
              <div v-html="course.courseDescription" class="desc"></div>
            </van-tab>
            <van-tab title="内容">
              <!-- 章节课时组件 -->
              <course-section
              v-for="item in sections"
              :key="item.id"
              :section-data="item">
              </course-section>
            </van-tab>
          </van-tabs>
        </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="pay-price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span>￥ {{ course.price }}</span>
      </div>
      <van-button type="primary" @click="goPay">立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { Cell, CellGroup, Tab, Tabs, Tabbar, Button } from 'vant'
import { getCourseById, getSectionAndLesson } from '@/services/course'
import CourseSection from './components/CourseSectionAndLesson.vue'

export default {
  name: 'CourseInfo',
  components: {
    CourseSection,
    VanCell: Cell,
    VanCellGroup: CellGroup,
    VanTab: Tab,
    VanTabs: Tabs,
    VanButton: Button,
    VanTabbar: Tabbar
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {},
      // 课程章节信息
      sections: [],
      // 样式
      styleOpts: {}
    }
  },
  created () {
    this.loadCourseInfo()
    this.loadSections()
  },
  methods: {
    // 请求课程信息
    async loadCourseInfo () {
      const { data } = await getCourseById({ courseId: this.courseId })
      console.log(data)
      if (data.state === 1) {
        this.course = data.content
        if (data.content.isBuy) {
          this.styleOpts.bottom = 0
        }
      }
    },
    // 请求章节课时信息
    async loadSections () {
      const { data } = await getSectionAndLesson({ courseId: this.courseId })
      console.log(data)
      if (data.state === 1) {
        this.sections = data.content.courseSectionList
      }
    },
    goPay () {
      // 检测是否登录
      if (this.$store.state.user) {
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group{
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 50px;
  overflow-y: scroll;
}
.van-cell{
    padding: 0;
}
.course-img{
    height: 280px;
    img{
        height: 280px;
    }
}
.course-desc{
    padding: 10px 20px;
    height: 150px;
    h3{
        padding: 0;
    }
}
.course-sale{
    display: flex;
    .price{
        flex: 1;
        margin: 0;
        .discounts{
            color: #ff7452;
            font-size: 24px;
            font-weight: bold;
            margin-right: 10px;
        }
    }
    .tag{
        font-size: 12px;
        line-height: 15px;
        font-weight: 700;
        background-color: #f8f9fa;
        border-radius: 5px;
        color: #666;
        margin-left: 10px;
        padding: 7px;
    }
}
::v-deep .desc{
  img{
    display: block;
    width: 100%;
  }
}
.van-tabbar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  span{
    font-size: 18px;
  }
  .van-button{
    width: 40%;
    height: 80%;
    span{
      font-size: 16px;
    }
  }
}
.discounts{
  color: #ff7452;
  font-size: 24px !important;
  font-weight: bold;
  margin-right: 10px;
}
</style>
