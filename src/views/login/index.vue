<template>
  <div class="login">
    <!-- 导航 -->
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="image-box">
      <van-image
       src="http://eduboss.lagou.com/edu-boss-fed/assets/img/logo.e8b9190b.png"
       width="3rem"
       height="3rem"
      ></van-image>
    </div>
    <!-- 登陆表单 -->
    <van-form @submit="onSubmit" label-width="60px" label-align="left">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="手机号"
        clearable
        :rules="[
          { required: true, message: '请填写手机号' },
          { validator: checkPhone, message: '手机号格式有误' }
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        clearable
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^[a-zA-z0-9]{6,12}$/, message: '密码格式有误' }
        ]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" :loading="isLoading">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Field, Button, Form, Image, Toast } from 'vant'
import { userLogin } from '@/services/user'

export default {
  name: 'Login',
  components: {
    VanNavBar: NavBar,
    VanField: Field,
    VanButton: Button,
    VanForm: Form,
    VanImage: Image
  },
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    checkPhone (value) {
      return /^1\d{10}$/.test(value)
    },
    // 登录
    async onSubmit () {
      this.isLoading = true
      const { data } = await userLogin(this.form)
      console.log(data)
      if (data.state === 1) {
        // 将用户信息存储到store.state
        this.$store.commit('setUser', data.content)
        Toast.success('登陆成功')
        // 跳转到用户操作的最后一个页面，或者首页
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        Toast.fail(`${data.message}`)
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  .image-box{
    width: 100%;
    text-align: center;
    .van-image{
      margin: 40px 0;
    }
  }
}
</style>
