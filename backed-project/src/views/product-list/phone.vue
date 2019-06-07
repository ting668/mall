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
  name: 'Phone',
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
