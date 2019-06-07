<template>
  <div class="video-container">
    <video
      webkit-playsinline
      playsinline
      x5-playsinline
      loop
      preload="auto"
      muted
      autoplay
      id="video"
      poster=""
      data-volume="1"
    >
      <source src="https://mallimg.moco.com/MO_191_proxy.mp4" type="video/mp4">
    </video>
    <div class="voice-control-container">
      <div class="voice-control-muted"></div>
      <div class="voice-control-step hidden"></div>
      <div class="voice-control-step-bg hidden"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoupleList',
  data() {
    return {
      zoomTitle: '新品尝鲜',
      couplelist: [
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
        },
        {
          url:
            'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          url:
            'https://images.pexels.com/photos/1420702/pexels-photo-1420702.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          url:
            'https://images.pexels.com/photos/1420702/pexels-photo-1420702.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
      ]
    }
  },
  methods: {
    goPersonal: function() {
      this.$router.push({
        name: 'Register'
      })
    },
    goHomepage: function() {
      this.$router.push({
        name: 'HomePage'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 80px auto 40px;
  font-size: 32px;
  color: #09007a;
}
.cart-list {
  width: 1000px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-cart {
    cursor: pointer;
    position: relative;
    margin-top: 30px;
    height: 400px;
    width: calc(50% - 15px);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: 1.27s cubic-bezier(0.15, 0.36, 0.34, 0.37);
    }
    img:hover {
      transform: scale(1.27);
    }
    .img-cart-mask {
      position: absolute;
      top: 0px;
      left: 30px;
      pointer-events: none;
      p {
        color: #ffffff;
        font-size: 42px;
        opacity: 1;
      }
    }
  }
  .img-cart:nth-child(2n) {
    margin-left: 15px;
  }
  .img-cart:nth-child(2n + 1) {
    margin-right: 15px;
  }
}
</style>
