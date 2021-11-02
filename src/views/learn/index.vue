<template>
  <div class="learn">
    <!-- 顶部功能 -->
    <van-nav-bar
      title="已购课程"
    />
    <!-- 课程列表 -->
    <course-content-list
    :fetch-data="fetchData"></course-content-list>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import LayoutFooter from '@/components/LayoutFooter.vue'
import CourseContentList from '@/components/CourseContentList.vue'
import { getPurchaseCourse } from '@/services/course'

export default {
  name: 'Learn',
  components: {
    CourseContentList,
    LayoutFooter,
    VanNavBar: NavBar
  },
  created () {
  },
  methods: {
    fetchData () {
      return getPurchaseCourse()
    }
  }
}
</script>

<style lang="scss" scoped>
.learn{
  height: 100vh;
  .course-content-list{
    top: 50px;
    bottom: 50px;
  }
}
</style>
