<template>
  <div>
    <Header/>
    <Content ref="scrollContent">
      <div class="content">
        <CoupleZoom/>
         <CoupleFaded/>
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
import { Swipe, SwipeItem } from 'vant'
export default {
  name: 'PC',
  components: {
    Header,
    Content,
    Footer,
    CoupleFaded,
    CoupleZoom,
    Swipe,
    SwipeItem
  },
  data() {
    return {
      carouselImgs: [
        {
          url:
            'https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          url:
            'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          url:
            'https://images.pexels.com/photos/1420702/pexels-photo-1420702.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollContent.refresh()
    })
  },
  methods: {
    init: function() {
      let _this=this
      Axios.get('/shop/pc')
        .then(function(res) {
         _this.carouselImgs=res.data.data[0].carousel
         _this.newProduct=res.data.data[0].newProduct
         console.log (_this.carouselImgs)
          
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
