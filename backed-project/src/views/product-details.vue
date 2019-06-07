<template>
  <div>
    <Header/>
    <Content ref="scrollContent">
      <div class="content">
        <div class="details-container">
          <div class="img-container hidden-xs" :style="{width:imgContWidth+'%'}">
            <img v-for="(item,index) in imgList" :key="index" :src="item.url">
          </div>
          <van-swipe :autoplay="3000" indicator-color="white" class="visible-xs img-container">
            <van-swipe-item v-for="(item,index) in imgList" :key="index">
              <img :src="item.url">
            </van-swipe-item>
          </van-swipe>
          <div v-show="skuActive" class="sku-container" ref="sku">
            <div class="sku-title">纯色吊带背心</div>
            <div class="sku-info">16:00-24:00下单，预计明日发货。新品提前发售 | 七天无理由退换货 | 享线下会员权益</div>
            <div class="sku-price">￥499.00</div>
            <div class="sku-color-container">
              <p class="sku-color-title">颜色</p>
              <div class="sku-color">
                <div @click="colorSelect(index)" v-for="(item,index) in colorData" :key="index">
                  <div class="sku-color-set" :style="{backgroundColor:item.color}"></div>
                  <div class="sku-color-info">{{item.color}}</div>
                </div>
              </div>
            </div>
            <div class="sku-size-container">
              <p class="sku-size-title">配置</p>
              <div class="sku-size">
                <div
                  class="sku-size-set"
                  @click="sizeSelect(index)"
                  v-for="(item,index) in sizeData"
                  :key="index"
                >{{item.name}}</div>
              </div>
            </div>
            <div class="sku-operate">
              <div class="sku-addshopcar">加入购物车</div>
              <div class="sku-pay">购买</div>
            </div>
            <div class="sku-details"></div>
          </div>
        </div>
      </div>
    </Content>
    <div v-show="!skuActive" class="gotop" @click="goTop()">
      <img src="@/assets/img/goTop.svg">
    </div>
  </div>
</template>

<script>
import Header from '@/components/common-header'
import Content from '@/components/common-content'
import Footer from '@/components/common-footer'
import { Swipe, SwipeItem, Sku } from 'vant'
export default {
  name: 'Details',
  components: {
    Header,
    Content,
    Footer,
    Sku,
    Swipe,
    SwipeItem
  },
  data() {
    return {
      imgContWidth: 50,
      skuActive: true,
      scrollCache: 0,
      imgList: [
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
      ],
      colorIndex: 0,
      colorData: [
        {
          color: 'red',
          name: '红色'
        },
        {
          color: 'green',
          name: '绿色'
        },
        {
          color: 'red',
          name: '红色'
        },
        {
          color: 'red',
          name: '红色'
        },
        {
          color: 'red',
          name: '红色'
        },
        {
          color: 'red',
          name: '红色'
        }
      ],
      sizeIndex: 0,
      sizeData: [
        { name: '4+32' },
        { name: '4+32' },
        { name: '4+32' },
        { name: '4+32' },
        { name: '4+32' }
      ]
    }
  },
  mounted() {
    const self = this
    this.$nextTick(() => {
      this.$refs.scrollContent.scroll.on('scroll', function(pos) {
        let skuHeight = document.querySelector('.sku-container').clientHeight
        if (skuHeight < Math.abs(pos.y)) {
          self.imgContWidth = 90
          self.skuActive = false
        } else {
          self.imgContWidth = 50
          self.skuActive = true
        }
      })
    })
  },
  methods: {
    goTop: function() {
      this.$refs.scrollContent.scroll.scrollTo(0, 0)
    },
    colorSelect: function(index) {
      if (this.colorIndex === index) {
        return
      }
      let colorListDom = document.querySelectorAll('.sku-color-set')
      colorListDom[this.colorIndex].classList.remove('active')
      colorListDom[index].classList.add('active')
      this.colorIndex = index
    },
    sizeSelect: function(index) {
      if (this.sizeIndex === index) {
        return
      }
      let sizeListDom = document.querySelectorAll('.sku-size-set')
      sizeListDom[this.sizeIndex].classList.remove('active')
      sizeListDom[index].classList.add('active')
      this.sizeIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.gotop {
  width: 40px;
  height: 40px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 70px;
  bottom: 70px;
  cursor: pointer;
  border-radius: 100%;
  opacity: 0.9;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: 0.5s all;
  img {
    width: 30px;
    height: 30px;
  }
}
.gotop:hover {
  border-radius: 5px;
  opacity: 1;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}
.content {
  width: 90%;
  margin: auto;
  .details-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
    .img-container {
      width: 60%;
      transition: 1s all;
      img {
        width: 100%;
      }
    }
    .sku-container {
      width: 40%;
      .sku-title {
        margin: 20px 0;
        color: #09007a;
        font-size: 28px;
        font-weight: 600;
      }
      .sku-info {
        margin: 20px 0;
        font-size: 12px;
      }
      .sku-price {
        color: #09007a;
        font-size: 20px;
        font-weight: 500;
        margin: 20px 0;
      }
      .sku-color-container {
        display: flex;
        flex-direction: column;
        .sku-color-title {
          color: #808080;
          font-size: 14px;
          text-align: center;
        }
        .sku-color {
          padding: 10px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          cursor: pointer;
        }
        .sku-color-set {
          width: 15px;
          height: 15px;
          margin: 10px 15px;
          border-radius: 100%;
          background-color: red;
          border: 4px solid #ffffff;
        }
        .sku-color-info {
          font-size: 12px;
          margin: 0 0 10px 0;
        }
        .active {
          border: 4px solid #ffffff;
          box-shadow: 0 0 0 1px #09007a;
        }
      }
      .sku-size-container {
        display: flex;
        flex-direction: column;
        .sku-size-title {
          color: #808080;
          font-size: 14px;
          text-align: center;
        }
        .sku-size {
          padding: 10px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .sku-size-set {
          cursor: pointer;
          height: 30px;
          line-height: 30px;
          border-radius: 3px;
          padding: 3px 10px;
          margin: 15px;
          border: 1px solid #e5e5e5;
        }
        .active {
          border: 1px solid #09007a;
        }
      }
      .sku-operate {
        display: flex;
        justify-content: center;
        margin: 20px 0;
        .sku-addshopcar {
          margin: 0 15px;
          width: 180px;
          height: 40px;
          line-height: 40px;
          color: #ffffff;
          cursor: pointer;
          background-color: #000000;
          border: 1px solid #ffffff;
        }
        .sku-pay {
          margin: 0 15px;
          width: 180px;
          height: 40px;
          line-height: 40px;
          color: #000000;
          cursor: pointer;
          background-color: #ffffff;
          border: 1px solid #000000;
        }
      }
    }
    .sku-container-active {
      position: fixed;
      top: 50%;
      right: 0;
    }
  }
}
@media (max-width: 767px) {
  .content {
    width: 100%;
    margin: auto;
    .details-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: flex-start;
      .img-container {
        width: 100%;
      }
      .sku-container {
        width: 90%;
        .sku-title {
          margin: 20px 0;
          color: #09007a;
          font-size: 24px;
          font-weight: 600;
        }
        .sku-info {
          margin: 20px 0;
          font-size: 12px;
        }
        .sku-price {
          color: #09007a;
          font-size: 20px;
          font-weight: 500;
          margin: 20px 0;
        }
        .sku-color-container {
          display: flex;
          flex-direction: column;
          .sku-color-title {
            line-height: 10px;
          }
          .sku-color {
            padding: 10px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            cursor: pointer;
          }
          .sku-color-set {
            width: 15px;
            height: 15px;
            margin: 10px 15px;
            border-radius: 100%;
            background-color: red;
            border: 4px solid #ffffff;
          }
          .sku-color-info {
            font-size: 12px;
            margin: 0 0 10px 0;
          }
          .active {
            border: 4px solid #ffffff;
            box-shadow: 0 0 0 1px #09007a;
          }
        }
        .sku-size-container {
          display: flex;
          flex-direction: column;
          .sku-size-title {
            line-height: 10px;
          }
          .sku-size {
            padding: 10px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .sku-size-set {
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            border-radius: 3px;
            padding: 3px 10px;
            margin: 7px;
            border: 1px solid #e5e5e5;
          }
          .active {
            border: 1px solid #09007a;
          }
        }
        .sku-operate {
          display: flex;
          justify-content: center;
          margin: 20px 0;
          .sku-addshopcar {
            margin: 0 5px;
            width: 180px;
            height: 35px;
            line-height: 35px;
            color: #ffffff;
            cursor: pointer;
            background-color: #000000;
            border: 1px solid #ffffff;
          }
          .sku-pay {
            margin: 0 5px;
            width: 180px;
            height: 35px;
            line-height: 35px;
            color: #000000;
            cursor: pointer;
            background-color: #ffffff;
            border: 1px solid #000000;
          }
        }
      }
    }
  }
}
</style>
