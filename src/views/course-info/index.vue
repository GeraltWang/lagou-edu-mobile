<template>
  <div class="course-info">
    <!-- {{courseId}} -->
    <van-cell-group :border="false">
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
        <van-cell class="course-details"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getCourseById } from '@/services/course'

export default {
  name: 'CourseInfo',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {}
    }
  },
  created () {
    this.loadCourseInfo()
  },
  methods: {
    async loadCourseInfo () {
      const { data } = await getCourseById({ courseId: this.courseId })
      console.log(data)
      if (data.state === 1) {
        this.course = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell{
    padding: 0;
}
.course-img{
    height: 280px;
    img{
        // width: 100%;
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
</style>
