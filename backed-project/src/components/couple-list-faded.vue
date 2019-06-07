<template>
  <div class="couple-container">
    <div class="title">{{fadedTitle}}</div>
    <div class="cart-list">
      <div class="product" v-for="(item,index) in fProductList" :key="index">
        <div class="img-cart" @click="goDetails()">
          <img :src="item.url">
          <div class="img-cart-mask">
            <p>Look</p>
          </div>
        </div>
        <div class="product-info" @click="goDetails()">
          <div class="product-title">{{item.name}}</div>
          <div class="product-price">{{item.price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoupleList',
  props: {
    fProductList: {
      type: Array
    }
  },
  data() {
    return {
      fadedTitle: '热销产品'
    }
  },
  methods: {
    goDetails: function() {
      this.$router.push({
        name: 'Details'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.couple-container {
  overflow: hidden;
  position: relative;
  .title {
    line-height: 160px;
    font-size: 32px;
    color: #09007a;
  }
  .cart-list {
    max-width: 1000px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .product {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      height: auto;
      width: calc(50% - 15px);
      .img-cart {
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 100%;
        img {
          width: 100%;
          height: 100%;
        }
        .img-cart-mask {
          position: absolute;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          cursor: pointer;
          width: 100%;
          height: 100%;
          transition: 500ms background-color cubic-bezier(0.4, 0, 0.6, 1);
          p {
            color: #ffffff;
            font-size: 42px;
            opacity: 0;
          }
        }
        .img-cart-mask:hover {
          background: rgba(0, 0, 0, 0.3);
          p {
            opacity: 1;
          }
        }
      }
      .product-info {
        color: #000000;
        .product-title {
          font-size: 14px;
          margin: 15px 0 5px 0;
          cursor: pointer;
        }
        .product-price {
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    .product:nth-child(2n) {
      margin-left: 15px;
    }
    .product:nth-child(2n + 1) {
      margin-right: 15px;
    }
  }
}
@media (max-width: 767px) {
  .couple-container {
    overflow: hidden;
    position: relative;
    .title {
      line-height: 80px;
      font-size: 24px;
      color: #09007a;
    }
    .cart-list {
      .product {
        width: calc(50% - 3px);
        margin-bottom: 15px;
        .img-cart {
          cursor: pointer;
          position: relative;
          overflow: hidden;
          width: 100%;
          img {
            width: 100%;
            height: 100%;
          }
          .img-cart-mask {
            position: absolute;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            cursor: pointer;
            width: 100%;
            height: 100%;
            transition: 500ms background-color cubic-bezier(0.4, 0, 0.6, 1);
            p {
              color: #ffffff;
              font-size: 20px;
              opacity: 1;
            }
          }
          .img-cart-mask:hover {
            background: rgba(0, 0, 0, 0.3);
            p {
              opacity: 1;
            }
          }
        }
        .product-info {
          color: #000000;
          .product-title {
            font-size: 12px;
            margin: 7px 0 5px 0;
          }
          .product-price {
            font-size: 12px;
          }
        }
      }
      .product:nth-child(2n) {
        margin-left: 3px;
      }
      .product:nth-child(2n + 1) {
        margin-right: 3px;
      }
    }
  }
}
</style>
