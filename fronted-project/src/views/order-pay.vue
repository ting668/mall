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
        <div class="title">订单支付</div>
        <div class="pay-container">
          <div class="pay-methods">
            <p class="font18">微信支付</p>
            <img src="http://lkk.2lb.top/wx-15581227565.png">
          </div>
          <div class="pay-methods">
            <p class="font18">支付宝支付</p>
            <img src="http://lkk.2lb.top/zfb-15581227565.jpg">
          </div>
        </div>
        <h3>
          需支付金额：
          <span class="font24">{{ orderInfo.orderList.allPrice}}</span>
        </h3>
        <p>订单id：{{orderInfo._id}}</p>
        <div class="address-container">
          <p class="font18">收货信息</p>
          <div class="address-info">
            <el-input type="text" placeholder="收货人姓名" v-model="addressInfo.name">
              <template slot="prepend">姓名</template>
            </el-input>
            <el-input type="number" placeholder="收货人手机号" v-model="addressInfo.phoneNumber">
              <template slot="prepend">电话</template>
            </el-input>
            <el-input type="text" placeholder="选择省 / 市 / 区" v-model="addressInfo.addressBase">
              <template slot="prepend">地区</template>
            </el-input>
            <el-input type="text" placeholder="街道门牌、楼层房间号等信息" v-model="addressInfo.addressDetails">
              <template slot="prepend">详细地址</template>
            </el-input>
            <el-input type="number" placeholder="邮政编码" v-model="addressInfo.addressCode">
              <template slot="prepend">邮政编码</template>
            </el-input>
            <el-input type="text" placeholder="备注" v-model="addressInfo.remarks">
              <template slot="prepend">备注</template>
            </el-input>
          </div>
        </div>
        <div class="confirm">
          <el-button size="medium" round @click="goback">取消支付，返回</el-button>
          <el-button
            size="medium"
            type="primary"
            round
            :loading="confirming"
            @click="confirmOrder"
          >我已支付，确认</el-button>
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
import { AddressEdit, Area } from 'vant'
import Axios from '@/service/axiosPlugin'
export default {
  name: 'OrderPay',
  components: {
    Header,
    Content,
    Footer,
    ShoppingCar,
    AddressEdit,
    Area
  },
  data() {
    return {
      orderInfo: { orderList: { allPrice: '' } },
      scrollConfig: {
        stillPullDown: false, //是否处于下拉刷新状态
        stillPullUp: false, //是否处于上拉加载状态
        pullupLoading: true //true上拉加载显示正在加载false没有更多
      },
      addressInfo: {},
      confirming: false
    }
  },
  created() {
    if (!this.$route.params.orderId && !this.$store.state.orderId) {
      return
    } else if (this.$route.params.orderId) {
      this.$store.commit('setOrderId', this.$route.params.orderId)
    }
    this.init()
  },
  methods: {
    init: function() {
      let _this = this
      Axios.post('/shop/order-pay', {
        payId: _this.$route.params.orderId || _this.$store.state.orderId
      })
        .then(function(res) {
          _this.orderInfo = res.data.state[0]
          if (_this.orderInfo.state!=="待支付") {
             _this.$toast.fail('订单已支付！')
             _this.goback()
          }
          console.log(_this.orderInfo)
          _this.scrollConfig.stillPullDown = false
          _this.$nextTick(() => {
            _this.$refs.scrollContent.refresh()
          })
        })
        .catch(function(error) {
          console.log(error)
          _this.$toast.fail('数据请求出错！')
        })
    } /*上拉加载*/,
    loadMore() {
      this.scrollConfig.stillPullUp = true
      this.scrollConfig.stillPullDown = false
      this.scrollConfig.pullupLoading = false
    },
    /*下拉刷新*/
    pullDownRefresh() {
      this.scrollConfig.stillPullDown = true
      this.scrollConfig.stillPullUp = false
      this.init()
    },
    confirmOrder() {
      this.confirming = true
      if (
        !this.addressInfo.name ||
        !this.addressInfo.phoneNumber ||
        !this.addressInfo.addressDetails ||
        !this.addressInfo.addressCode
      ) {
        this.$toast.fail('请完善收获信息！')
        this.confirming = false
        return
      } else if (
        !/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(
          this.addressInfo.phoneNumber
        )
      ) {
        this.$toast.fail('请输入正确的手机或电话号码！')
        this.confirming = false
        return
      } else if (!/[1-9]\d{5}(?!\d)/.test(this.addressInfo.addressCode)) {
        this.$toast.fail('请输入正确的邮编号码！')
        this.confirming = false
        return
      }
      let _this = this
      Axios.post('/shop/order-payed', {
        payId: _this.$route.params.orderId || _this.$store.state.orderId,
        expressInfo: _this.addressInfo
      })
        .then(function(res) {
          debugger
          if (res.data.state === true) {
            _this.$toast.fail('订单支付成功！')
            _this.goback()
          } else {
            _this.$toast.fail('订单支付异常，请重试！')
            _this.confirming = false
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    goback() {
      history.back()
    }
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
    line-height: 160px;
  }
  .pay-container {
    display: flex;
    justify-content: center;
    max-width: 1000px;
    margin: auto;
    .pay-methods {
      img {
        width: calc(100% - 15px);
      }
    }
  }
  .address-container {
    padding-top: 20px;
    max-width: 800px;
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    .address-info {
      padding: 0 30px;
      .el-input-group {
        margin: 10px 0;
      }
    }
  }
  .confirm {
    height: 100px;
    line-height: 100px;
  }
}
@media (max-width: 767px) {
  .content {
    .title {
      line-height: 80px;
    }
    .pay-container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      max-width: 1000px;
      margin: auto;
      .pay-methods {
        img {
          width: calc(100% - 15px);
        }
      }
    }
    .address-container {
      padding-top: 20px;
      max-width: 800px;
      margin: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      .address-info {
        padding: 0 10px;
        .el-input-group {
          margin: 10px 0;
        }
      }
    }
    .confirm {
      height: 100px;
      line-height: 100px;
    }
  }
}
</style>
