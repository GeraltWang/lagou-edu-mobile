<template>
  <div class="course-content-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <!-- 列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
        @click="$router.push({ name: 'course-info', params: { courseId: item.id } })"
        v-for="item in list"
        :key="item.id">
          <!-- 左侧图片 -->
          <div>
              <van-image :src="item.courseImgUrl || item.image" width="2.3rem" height="2.8rem" radius="5" fit="fill">
                  <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                  </template>
              </van-image>
          </div>
          <!-- 右侧信息 -->
          <div class="course-info">
              <h3 v-text="item.courseName || item.name"></h3>
              <p v-html="item.previewFirstField" class="course-preview"></p>
              <!-- 如果为已购课程，无需显示价格 -->
              <p class="course-price" v-if="item.price">
                  <span class="course-discounts">￥{{ item.discounts }}</span>
                  <s class="course-price">￥{{ item.price }}</s>
              </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'CourseContentList',
  props: {
    // 用于数据展示的函数
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      // 课程数据
      list: [],
      // 加载状态
      loading: false,
      // 加载完毕
      finished: false,
      // 数据页数
      currentPage: 1,
      // 下拉刷新状态
      isRefreshing: false
    }
  },
  created () {
    // this.onLoad()
  },
  methods: {
    // 触底时触发，请求下一页数据
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        // 只请求已上架课程
        status: 1
      })
      console.log(data)
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      // 下次请求下一页
      this.currentPage++
      // 结束加载状态
      this.loading = false
      // 数据加载完成
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      // 重置 加载完成 状态
      this.finished = false
      // 重置页数为 1
      this.currentPage = 1
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        // 只请求已上架课程
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        // 下拉刷新会清除之前的数据，所以是赋值操作
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      console.log(data)
      // 提示
      this.$toast('刷新完成')
      // 下拉刷新完毕
      this.isRefreshing = false
      // 页数+1,避免重复请求第一页数据
      this.currentPage++
    }
  }
}
</script>

<style lang="scss" scoped>
// 列表组件默认样式
p, h3{
    margin: 0;
}
.course-content-list{
    position: fixed;
    overflow-y: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // 课程卡片样式
    .van-cell__value{
        display: flex;
        // align-items: center;
        padding: 10px 0;
        height: 100px;
        .course-info{
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 0 10px;
            .course-preview{
                flex-grow: 1;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .course-discounts{
                color: #ff7452;
                margin-right: 5px;
            }
        }
    }
}
</style>
