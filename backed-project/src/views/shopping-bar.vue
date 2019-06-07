<template>
  <div>
    <Header/>
    <Content ref="scrollContent">
      <div class="content">
        <div class="title">我的购物袋</div>
        <div class="product-container">
          <ShoppingCar/>
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
    line-height: 120px;
  }
}
</style>
