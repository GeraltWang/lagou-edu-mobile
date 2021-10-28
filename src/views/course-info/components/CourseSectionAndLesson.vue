<template>
  <div class="course-section">
      <h2 class="section">{{ sectionData.sectionName }}</h2>
      <!-- 课时列表 -->
      <p
      class="lesson"
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      @click="videoPlay(item)"
      >
        <span v-text="item.theme"></span>
        <van-icon v-if="item.canPlay" size="20" name="play-circle" />
        <van-icon v-else size="20" name="lock" />
      </p>
  </div>
</template>

<script>
export default {
  name: 'CourseSection',
  props: {
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    videoPlay (lesson) {
      if (lesson.canPlay) {
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lesson.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-section{
    padding: 0 20px;
    .lesson{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
