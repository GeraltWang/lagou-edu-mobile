<template>
  <div class="course-content">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" lazy-render :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in activeAdList" :key="item.id">
            <img :src="item.img">
        </van-swipe-item>
      </van-swipe>
      <!-- 课程列表 -->
      <course-content-list
      :fetch-data="fetchData"></course-content-list>
  </div>
</template>

<script>
import { getAllAds, getQueryCourses } from '@/services/course'
import CourseContentList from '@/components/CourseContentList.vue'

export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  data () {
    return {
      // 轮播图
      adList: []
    }
  },
  created () {
    // 请求轮播图
    this.loadAllAds()
  },
  methods: {
    async loadAllAds () {
      const { data } = await getAllAds({
        // 999 代表首页顶部轮播图广告位
        spaceKeys: 999
      })
      console.log(data)
      this.adList = data.content[0].adDTOList
    },
    fetchData (options) {
      return getQueryCourses(options)
    }
  },
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-swipe{
    width: 100%;
    .van-swipe-item {
      overflow: hidden;
      display: flex;
      justify-content: center;
      img{
        width: 100%;
      }
    }
}
.course-content-list{
    top: 230px;
    bottom: 50px;
}
</style>
