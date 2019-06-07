<template>
  <div class="couple-container">
    <div class="title">{{zoomTitle}}</div>
    <div class="cart-list">
      <div class="product" v-for="(item,index) in zProductList" :key="index">
        <div class="img-cart" @click="goDetails()">
          <img :src="item.url">
          <div class="img-cart-mask">
            <p>Search</p>
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
    zProductList:{
      type:Array
    }
  },
  data() {
    return {
      zoomTitle: '新品尝鲜'
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
@media (max-width: 767px) {
  .title {
    line-height: 80px;
    font-size: 24px;
    color: #09007a;
  }
  .cart-list {
    .product {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      height: auto;
      width: calc(50% - 3px);
      .img-cart {
        img:hover {
          transform: none;
        }
        .img-cart-mask {
          position: absolute;
          top: 0px;
          left: 15px;
          pointer-events: none;
          p {
            font-size: 18px;
            line-height: 10px;
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
</style>
