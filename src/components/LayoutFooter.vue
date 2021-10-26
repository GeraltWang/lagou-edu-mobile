<template>
  <div class="layout-footer">
    <van-tabbar route>
        <van-tabbar-item replace to="/" icon="bookmark-o">选课</van-tabbar-item>
        <van-tabbar-item replace to="/learn" icon="records">学习</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style lang="scss" scoped>
.layout-footer{
  display: fixed;
  bottom: 0;
  left: 0;
}
</style>
