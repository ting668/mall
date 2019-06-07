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
        <ProductCard :Products="productInfo" :Title="title"/>
      </div>
    </Content>
  </div>
</template>

<script>
import Header from '@/components/common-header'
import Content from '@/components/common-content'
import Footer from '@/components/common-footer'
import ProductCard from '@/components/product-card'
import { Swipe, SwipeItem } from 'vant'
import Axios from '@/service/axiosPlugin'
export default {
  name: 'Pad',
  components: {
    Header,
    Content,
    Footer,
    ProductCard,
    Swipe,
    SwipeItem
  },
  data() {
    return {
      title:"Pad",
      productInfo: [],
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
      this.productInfo=[]
      Axios.get('/shop/pad/more')
        .then(function(res) {
          _this.productInfo = res.data.data
          _this.scrollConfig.stillPullDown = false
          _this.$nextTick(() => {
            _this.$refs.scrollContent.refresh()
          })
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    /*上拉加载*/
    loadMore() {
      this.scrollConfig.stillPullUp = true
      this.scrollConfig.stillPullDown = false
      this.loadMoreData()
    },
    /*下拉刷新*/
    pullDownRefresh() {
      this.scrollConfig.stillPullDown = true
      this.scrollConfig.stillPullUp = false
      this.init()
    },
    loadMoreData() {
      console.log('loadMore')
      let _this = this
      Axios.post('/shop/pad/more', {
        id: _this.productInfo[_this.productInfo.length - 1]._id
      })
        .then(function(res) {
          if (res.data.data.length === 0) {
            _this.scrollConfig.pullupLoading = false
            return
          }
          _this.productInfo = _this.productInfo.concat(res.data.data)
          console.log(_this.productInfo)
          _this.scrollConfig.stillPullUp = false
          _this.$nextTick(() => {
            _this.$refs.scrollContent.refresh()
          })
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  margin: auto;
}
img {
  width: 100%;
}
</style>
