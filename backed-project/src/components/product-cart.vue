<template>
  <div class="content">
    <div class="product-container">
      <div class="product" v-for="(item,index) in productData" :key="index">
        <div class="product-checked">
          <el-checkbox/>
        </div>
        <div class="product-img">
          <img :src="item.imgUrl">
        </div>
        <div class="product-info">
          <div class="product-name">{{item.name}}</div>
          <div class="product-total-price">总价：{{item.totalPrice}}</div>
          <div class="product-color">颜色：{{item.color}}</div>
          <div class="product-size">
            配置：{{item.size}}
            <van-stepper/>
          </div>
        </div>
        <div class="product-price hidden-xs">单价：{{item.price}}</div>
        <div class="product-number hidden-xs">
          <van-stepper/>
        </div>
        <div class="product-total-price hidden-xs">总价：{{item.totalPrice}}</div>
        <div class="product-delect">
          <img src="@/assets/img/delete.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Stepper } from 'vant'
export default {
  name: 'ProductCart',
  components: {
    Stepper
  },
  data() {
    return {
      checked: [false, true],
      productData: [
        {
          name: 'iphone 6',
          color: 'red',
          size: '2+128g',
          price: '2700',
          number: '1',
          totalPrice: '2700',
          imgUrl:
            'https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          name: 'iphone 6',
          color: 'red',
          size: '2+128g',
          price: '2700',
          number: '1',
          totalPrice: '2700',
          imgUrl:
            'https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          name: 'iphone 6',
          color: 'red',
          size: '2+128g',
          price: '2700',
          number: '1',
          totalPrice: '2700',
          imgUrl:
            'https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          name: 'iphone 6',
          color: 'red',
          size: '2+128g',
          price: '2700',
          number: '1',
          totalPrice: '2700',
          imgUrl:
            'https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          name: 'iphone 6',
          color: 'red',
          size: '2+128g',
          price: '2700',
          number: '1',
          totalPrice: '2700',
          imgUrl:
            'https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
      ],
      value: 1
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  .product-container {
    border-top: 1px solid #eeeeee;
    .product {
      margin: 15px 0;
      display: flex;
      .product-checked {
        display: flex;
        align-content: center;
        justify-content: center;
        width: 70px;
        min-width: 30px;
      }
      .product-img {
        width: 90px;
        height: 120px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .product-info {
        width: 15%;
        padding-top: 15px;
        height: 100px;
        text-align: left;
        padding-left: 20px;
        .product-name {
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 15px;
        }
        .product-color {
          font-size: 12px;
          color: #808080;
          margin: 10px 0;
        }
        .product-size {
          font-size: 12px;
          color: #808080;
          margin: 10px 0;
        }
      }
      .product-price {
        width: 15%;
        font-size: 14px;
        padding-top: 15px;
        height: 100px;
      }
      .product-number {
        width: 15%;
        font-size: 14px;
        padding-top: 15px;
        height: 100px;
      }
      .product-total-price {
        width: 15%;
        font-size: 14px;
        padding-top: 15px;
        height: 100px;
      }
      .product-delect {
        width: 15%;
        padding-top: 14px;
        height: 100px;
        img {
          width: 20px;
          cursor: pointer;
          opacity: 0.5;
        }
        img:hover {
          opacity: 1;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .content {
    width: 100%;
    max-width: 1000px;
    margin: auto;
    .product-container {
      border-top: 1px solid #eeeeee;
      .product {
        margin: 15px 0;
        display: flex;
        .product-checked {
          display: flex;
          align-content: center;
          justify-content: center;
          width: 25px;
          min-width: 25px;
        }
        .product-img {
          width: 90px;
          height: 110px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .product-info {
          width: 80%;
          padding-top: 5px;
          height: 100px;
          text-align: left;
          padding-left: 5px;
          .product-name {
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            margin-bottom: 0;
            height: 38px;
            line-height: 20px;
            word-break: break-all;
          }
          .product-color {
            font-size: 12px;
            color: #808080;
            margin: 5px 0;
          }
          .product-size {
            position: relative;
            font-size: 12px;
            color: #808080;
            margin: 5px 0;
            .van-stepper{
              position: absolute;
              bottom: 0;
              right:0;
            }
          }
        }
        .product-price {
          width: 15%;
          font-size: 14px;
          padding-top: 15px;
          height: 100px;
        }
        .product-number {
          width: 15%;
          font-size: 14px;
          padding-top: 15px;
          height: 100px;
        }
        .product-total-price {
          width: 100px;
          height: auto;
          padding: 0;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .product-delect {
          width: 25px;
          padding-top: 5px;
          height: 100px;
          img {
            width: 20px;
            cursor: pointer;
            opacity: 0.5;
          }
          img:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
