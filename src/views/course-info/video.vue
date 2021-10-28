<template>
  <div class="course-video">
    <van-nav-bar
      title="视频"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
  </div>
</template>

<script>
import { videoPlayInfo } from '@/services/course'

export default {
  name: 'CourseVideo',
  props: {
    lessonId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 视频信息
      videoInfo: {}
    }
  },
  created () {
    this.loadVideo()
  },
  methods: {
    async loadVideo () {
      const { data } = await videoPlayInfo({
        lessonId: this.lessonId
      })
      console.log(data)
      if (data.state === 1) {
        this.videoInfo = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
