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
        <el-carousel height="600px" indicator-position="outside" class="hidden-xs">
          <el-carousel-item v-for="(item,index) in carouselImgs" :key="index">
            <img :src="item.url" @click="goDetails(item.id)">
          </el-carousel-item>
        </el-carousel>
        <van-swipe :autoplay="3000" indicator-color="white" class="visible-xs">
          <van-swipe-item v-for="(item,index) in carouselImgs" :key="index">
            <img :src="item.url" @click="goDetails(item.id)">
          </van-swipe-item>
        </van-swipe>
        <CoupleZoom :zProductList="newProduct"/>
        <CoupleFaded :fProductList="hotProduct"/>
        <ProductCard :Products="productInfo" :Title="title"/>
      </div>
    </Content>
  </div>
</template>

<script>
import Header from '@/components/common-header'
import Content from '@/components/common-content'
import Footer from '@/components/common-footer'
import CoupleFaded from '@/components/couple-list-faded'
import CoupleZoom from '@/components/couple-list-zoom'
import ProductCard from '@/components/product-card'
import { Swipe, SwipeItem } from 'vant'
import Axios from '@/service/axiosPlugin'
export default {
  name: 'HomePage',
  components: {
    Header,
    Content,
    Footer,
    CoupleFaded,
    CoupleZoom,
    ProductCard,
    Swipe,
    SwipeItem,
    Axios
  },
  created() {
    this.init()
  },
  data() {
    return {
      title: '全部商品',
      carouselImgs: [],
      newProduct: [],
      hotProduct: [],
      productInfo: [],
      scrollConfig: {
        stillPullDown: false, //是否处于下拉刷新状态
        stillPullUp: false, //是否处于上拉加载状态
        pullupLoading: true //true上拉加载显示正在加载false没有更多
      }
    }
  },
  methods: {
    init: function() {
      let _this = this
      Axios.get('/shop/homepage')
        .then(function(res) {
          _this.carouselImgs = res.data.data[0].carousel
          _this.newProduct = res.data.data[0].newProduct
          _this.hotProduct = res.data.data[0].hotProduct
          _this.scrollConfig.stillPullDown = false
          _this.$nextTick(() => {
            _this.$refs.scrollContent.refresh()
          })
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    /*上拉加载*/ loadMore() {
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
      let id
      if (this.productInfo.length === 0) {
        id = ''
      } else {
        id = this.productInfo[this.productInfo.length - 1]._id
      }
      console.log('id')
      Axios.post('/shop/homepage/more', {
        id: id
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
    },
    goDetails: function(id) {
      this.$router.push({
        name: 'Details',
        params: {
          id: id
        }
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
