<template>
  <div>
    <Header/>
    <Content
      ref="scrollContent"
      v-bind="scrollConfig"
      @pullUp="loadMore"
      @pullDown="pullDownRefresh"
    >
      <div class="content">
        <div class="title">我的购物袋</div>
        <div class="product-container">
          <ShoppingCar :shopcarData="shopcarInfo"/>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Header from '@/components/common-header'
import Content from '@/components/common-content'
import Footer from '@/components/common-footer'
import ShoppingCar from '@/components/product-cart'
import Axios from '@/service/axiosPlugin'
export default {
  name: 'HomePage',
  components: {
    Header,
    Content,
    Footer,
    ShoppingCar
  },
  data() {
    return {
      shopcarInfo: '',
      scrollConfig: {
        stillPullDown: false, //是否处于下拉刷新状态
        stillPullUp: false, //是否处于上拉加载状态
        pullupLoading: true //true上拉加载显示正在加载false没有更多
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      let _this = this
      Axios.get('/shop/get-shopcar')
        .then(function(res) {
          console.log(res.data.data)
          _this.shopcarInfo = res.data.data
          _this.scrollConfig.stillPullDown = false
          _this.$nextTick(() => {
            _this.$refs.scrollContent.refresh()
          })
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    } /*上拉加载*/,
    loadMore() {
      this.scrollConfig.stillPullUp = true
      this.scrollConfig.stillPullDown = false
      this.scrollConfig.pullupLoading = false
    },
    /*下拉刷新*/
    pullDownRefresh() {
      this.scrollConfig.stillPullDown = true
      this.scrollConfig.stillPullUp = false
      this.init()
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  margin: auto;
  .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 160px;
  }
}
@media (max-width: 767px) {
  .content {
  .title {
    line-height: 80px;
  }
}
}
</style>
