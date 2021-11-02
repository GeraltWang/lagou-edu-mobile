<template>
  <div class="course-header">
      <van-image :src="require('@/assets/logo.png')"></van-image>
  </div>
</template>

<script>
import { Image as VanImage } from 'vant'

export default {
  name: 'CourseHeader',
  components: {
    VanImage
  }
}
</script>

<style lang="scss" scoped>
.course-header{
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  .van-image{
    width: 162px;
    margin-left: -20px;
  }
}
</style>
