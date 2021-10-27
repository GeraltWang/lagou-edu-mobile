<template>
  <div class="course">
    <course-header></course-header>
    <course-content></course-content>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter.vue'
import CourseHeader from './components/CourseHeader.vue'
import CourseContent from './components/CourseContent.vue'

export default {
  name: 'Course',
  components: {
    CourseHeader,
    CourseContent,
    LayoutFooter
  }
}
</script>

<style lang="scss" scoped>
.course{
  .course-content{
    position: fixed;
    top: 50px;
    left: 0;
  }
  .layout-footer{
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
