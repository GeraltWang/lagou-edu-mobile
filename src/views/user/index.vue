<template>
  <div class="user">
    <!-- 顶部功能 -->
    <van-cell-group inset>
      <van-cell class="user-info">
        <!-- 头像 -->
        <van-image round width="2rem" height="2rem"></van-image>
        <!-- 用户信息内容 -->
        <div class="user-info-content">
          <h3>昵称</h3>
          <span>
            <van-icon name="edit" />
            编辑个人资料
          </span>
        </div>
      </van-cell>
    </van-cell-group>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter.vue'
import { getInfo } from '@/services/user'

export default {
  name: 'User',
  components: {
    LayoutFooter
  },
  created () {
    this.test()
    this.test()
    this.test()
  },
  methods: {
    async test () {
      const { data } = await getInfo()
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info{
  padding: 30px 20px;
  background-color: rgb(248,150,3);
  .van-cell__value{
    display: flex;
    align-items: center;
    .user-info-content{
      flex: 1;
      padding-left: 20px;
      h3{
        margin: 5px;
        font-size: 18px;
      }
    }
  }
}
</style>
