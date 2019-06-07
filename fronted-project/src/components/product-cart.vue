<template>
  <div class="content">
    <div class="product-container">
      <div v-show="hasData" class="product" v-for="(item,index) in shopcarData" :key="index">
        <div class="product-checked">
          <el-checkbox v-model="item.checked"/>
        </div>
        <div class="product-img">
          <img :src="item.productInfo.imgUrl">
        </div>
        <div class="product-info">
          <div class="product-name">{{item.productInfo.name}}</div>
          <div class="product-total-price visible-xs">总价：{{item.productInfo.price*item.number}}</div>
          <div class="product-color">颜色：{{item.productInfo.color}}</div>
          <div class="product-size">
            配置：{{item.productInfo.size}}
            <van-stepper class="visible-xs" v-model="shopcarData[index].number"/>
          </div>
        </div>
        <div class="product-price hidden-xs">单价：{{item.productInfo.price}}</div>
        <div class="product-number hidden-xs">
          <van-stepper v-model="item.number"/>
        </div>
        <div class="product-total-price hidden-xs">总价：{{item.productInfo.price*item.number}}</div>
        <div class="product-delect" @click="deleteProduct(index)">
          <img src="@/assets/img/delete.svg">
        </div>
      </div>
      <div v-show="hasData" class="oprate">
        <div class="sku-pay" @click="goPay()">购买</div>
        <div class="allprice">
          总价：
          <span>{{allPrice}}</span>
        </div>
      </div>
      <div v-show="!hasData">
        <p class="mg-TB30">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Stepper } from 'vant'
import Axios from '@/service/axiosPlugin'
export default {
  name: 'ProductCart',
  components: {
    Stepper
  },
  props: {
    shopcarData: {}
  },
  data() {
    return {}
  },
  methods: {
    deleteProduct: function(index) {
      let _this = this
      Axios.post('/shop/delete-shopcar', {
        id: _this.shopcarData[index]._id
      })
        .then(function(res) {
          if (res.data.state) {
            _this.shopcarData.splice(index, 1)
            _this.$toast.success('移除商品成功！')
          } else {
            _this.$toast.fail('移除商品失败！')
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    goPay: function() {
      let productList = []
      let orderInfo = {}
      let checkedIndex = []
      for (let i = 0; i < this.shopcarData.length; i++) {
        if (this.shopcarData[i].checked) {
          productList.push(this.shopcarData[i])
          checkedIndex.push(i)
        }
      }
      if (productList.length === 0) {
        this.$toast.fail('未选择商品！')
        return
      }
      orderInfo = {
        productList: productList,
        allPrice: this.allPrice
      }
      let _this = this
      Axios.post('/shop/order-product', {
        orderList: orderInfo
      })
        .then(function(res) {
          if (res.data.state) {
            for (let i = 0; i < checkedIndex.length; i++) {
              _this.shopcarData.splice(checkedIndex[i], 1)
            }
            _this.$router.push({
              name: 'OrderPay',
              params: {
                orderId: res.data.state
              }
            })
          } else {
            _this.$toast.fail('购买失败，请重试！')
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    }
  },
  computed: {
    allPrice: function() {
      let price = 0
      for (let i = 0; i < this.shopcarData.length; i++) {
        if (this.shopcarData[i].checked) {
          let currentPrice =
            this.shopcarData[i].productInfo.price * this.shopcarData[i].number
          price += currentPrice
        }
      }
      return price
    },
    hasData: function() {
      return this.shopcarData.length === 0 ? false : true
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
    .oprate {
      border-top: 1px solid #eeeeee;
      padding-top: 30px;
      display: flex;
      flex-direction: row-reverse;
      padding-right: 10%;
      .allprice {
        height: 40px;
        line-height: 50px;
        span {
          font-size: 18px;
          font-weight: 500;
        }
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
        transition: 0.27s all;
      }
      .sku-pay:hover {
        box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.12);
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
            .van-stepper {
              position: absolute;
              bottom: 0;
              right: 0;
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
          width: 40px;
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
      .oprate {
        border-top: 1px solid #eeeeee;
        padding-top: 30px;
        display: flex;
        flex-direction: row-reverse;
        padding-right: 10px;
        .allprice {
          height: 30px;
          line-height: 45px;
          span {
            font-size: 18px;
            font-weight: 500;
          }
        }
        .sku-pay {
          margin: 0 15px;
          width: 130px;
          height: 35px;
          line-height: 35px;
          color: #000000;
          cursor: pointer;
          background-color: #ffffff;
          border: 1px solid #000000;
          transition: 0.27s all;
        }
        .sku-pay:hover {
          box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }
}
</style>
