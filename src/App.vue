<template>
  <div>
    <!-- 根路由出口 -->
    <router-view/>
  </div>
</template>
<script>
import request from '@/utils/request'
const { data } = request({
  method: 'GET',
  url: '/front/ad/getAdList'
})
console.log(data)
export default {
}
</script>
<style lang="scss">
</style>
