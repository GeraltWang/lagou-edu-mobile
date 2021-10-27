<template>
  <div class="user">
    <!-- 顶部功能 -->
    <van-cell-group inset :border="false" class="user-top">
      <!-- 用户信息 -->
      <van-cell class="user-info" :border="false">
        <!-- 头像 -->
        <van-image round width="2rem" height="2rem" :src="user.portrait"></van-image>
        <!-- 用户信息内容 -->
        <div class="user-info-content">
          <h3>{{ user.userName }}</h3>
          <span>
            <van-icon name="edit" />
            编辑个人资料
          </span>
        </div>
      </van-cell>
      <!-- 账户信息 -->
      <van-cell class="account-info" :border="false">
        <van-grid :border="false">
          <van-grid-item>
            <span class="grid-item-value">14.5</span>
            <span>学习时长</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">200</span>
            <span>钱包/勾豆</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">1</span>
            <span>优惠券</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">213</span>
            <span>学分</span>
          </van-grid-item>
          <!-- <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" /> -->
        </van-grid>
      </van-cell>
    </van-cell-group>
    <van-cell-group inset :border="false" class="user-menu">
      <van-cell icon="user-o" title="分销中心" is-link value="收益 200"></van-cell>
      <van-cell icon="setting-o" title="个性化设置" is-link></van-cell>
      <van-cell icon="down" title="我的下载" is-link></van-cell>
      <van-cell icon="question-o" title="帮助与反馈" is-link></van-cell>
      <van-cell icon="info-o" title="关于拉勾教育" is-link value="v2.0.0"></van-cell>
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
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getInfo()
      console.log(data)
      if (data.state === 1) {
        this.user = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user{
  height: 100vh;
  background-color: #f7f8fa;
}
.user-top{
  box-shadow: #ebedf0 0 4px 12px;
}
.user-info{
  padding: 20px;
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
.account-info{
  // background-color: #f0f0f0;
  .van-grid{
    border-radius: 6px;
    overflow: hidden;
    .grid-item-value{
      font-size: 22px;
    }
  }
}
.user-menu{
  margin-top: 10px;
  box-shadow: #ebedf0 0 4px 12px;
}
</style>
