<template>
  <div class="course-video">
    <van-nav-bar
      title="视频"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 播放组件 -->
    <div id="video-container"></div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { videoPlayInfo } from '@/services/course'

export default {
  name: 'CourseVideo',
  components: {
    VanNavBar: NavBar
  },
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
      // 初始化播放器
      const player = new window.Aliplayer({
        // 播放组件容器的ID
        id: 'video-container',
        // 视频ID
        vid: data.content.fileId,
        playauth: data.content.playAuth,
        qualitySort: 'asc',
        format: 'mp4',
        mediaType: 'video',
        width: '100%',
        height: '100%',
        autoplay: true,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      }, function (player) {
        console.log('The player is created')
      }
      )
      console.log(player)
    }
  }
}
</script>

<style lang="scss" scoped>
.course-video{
  height: 210px;
}
</style>
