<template>
  <div class="bg">
    <Header/>
    <div class="content">
      <h2 class>{{TypeName}}</h2>
      <div class="signout-container">
        <div class="signout" @click="signOut">
          注销登录
          <img src="@/assets/img/signout.svg">
        </div>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-shopping-bag-2"></i> 我的订单
          </span>
          <h3>我的订单</h3>
          <div v-show="hasData" class="order" v-for="(order,index) in Odrders" :key="index">
            <div class="product" v-for="(item,index) in order.orderList.productList" :key="index">
              <div class="product-checked"></div>
              <div class="product-img">
                <img :src="item.productInfo.imgUrl">
              </div>
              <div class="product-info">
                <div class="product-name">{{item.productInfo.name}}</div>
                <div
                  class="product-total-price visible-xs"
                >总价：{{item.productInfo.price*item.number}}</div>
                <div class="product-color">颜色：{{item.productInfo.color}}</div>
                <div class="product-size">
                  配置：{{item.productInfo.size}}
                  <van-stepper disabled class="visible-xs" v-model="item.number"/>
                </div>
              </div>
              <div class="product-price hidden-xs">单价：{{item.productInfo.price}}</div>
              <div class="product-number hidden-xs">
                <van-stepper disabled v-model="item.number"/>
              </div>
              <div class="product-total-price hidden-xs">总价：{{item.productInfo.price*item.number}}</div>
            </div>
            <div v-show="hasData" class="oprate">
              <div class="sku-pay" @click="oprate(order.state,order._id)">{{order.state}}</div>
              <div class="allprice">
                合计：
                <span>{{order.orderList.allPrice}}</span>
              </div>
              <div class="time hidden-xs">
                下单时间：
                <span>{{order.time}}</span>
              </div>
            </div>
            <div v-show="!hasData">
              <p class="mg-TB30">暂无数据</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-chat-dot-square"></i> 消息中心
          </span>暂无消息
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-setting"></i> 信息修改
          </span>
          <el-tabs>
            <el-tab-pane>
              <span slot="label">
                <i class="el-icon-key"></i> 密码修改
              </span>
              <div class="count">
                <el-input type="password" placeholder="请输入旧密码" v-model="oldPassword" show-password>
                  <template slot="prepend">旧 的 密 码</template>
                </el-input>
              </div>
              <div class="count">
                <el-input type="password" placeholder="请输入新密码" v-model="newPassword" show-password>
                  <template slot="prepend">新 的 密 码</template>
                </el-input>
              </div>
              <div class="count">
                <el-input
                  type="password"
                  placeholder="请输入确认密码"
                  v-model="newPassword2"
                  show-password
                >
                  <template slot="prepend">确 认 密 码</template>
                </el-input>
              </div>
              <div class="count">
                <el-button size="medium" round @click="goback">返回</el-button>
                <el-button
                  size="medium"
                  type="primary"
                  round
                  :loading="updatting"
                  @click="updatePassword"
                >修改</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label">
                <i class="el-icon-bell"></i> 邮箱修改
              </span>
              <div class="count">
                <el-input placeholder="请输入旧邮箱" v-model="oldPassword">
                  <template slot="prepend">密 码</template>
                </el-input>
              </div>
              <div class="count">
                <el-input placeholder="请输入新邮箱" v-model="newEmail">
                  <template slot="prepend">新 邮 箱</template>
                </el-input>
              </div>
              <div class="count">
                <el-button size="medium" round @click="goback">返回</el-button>
                <el-button
                  size="medium"
                  type="primary"
                  round
                  :loading="updatting"
                  @click="updateEmail"
                >修改</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common-header'
import Content from '@/components/common-content'
import Axios from '@/service/axiosPlugin'
import { Field } from 'vant'
export default {
  name: 'PersonalCenter',
  components: {
    Header,
    Content,
    Field,
    Axios
  },
  data() {
    return {
      TypeName: '个人中心',
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      newEmail: '',
      updatting: false,
      Odrders: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      let _this = this
      Axios.get('/shop/order-product')
        .then(function(res) {
          console.log(res.data)
          _this.Odrders = res.data.state
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    oprate: function(state, id) {
      switch (state) {
        case '待支付':
          this.$router.push({
            name: 'OrderPay',
            params: {
              orderId: id
            }
          })
          break
        case '待收货':
          this.$confirm('是否收货?', '确认收货', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
            .then(() => {
              this.confirmReceipt(id)
            })
            .catch(() => {})
          break
        case '已收货':
          this.$confirm('是否删除订单?', '删除订单', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
            .then(() => {
              this.deleteOrder(id)
            })
            .catch(() => {})
          break
      }
    },
    confirmReceipt: function(id) {
      let _this = this
      Axios.post('/shop/order-received', {
        payId: id
      })
        .then(function(res) {
          _this.init()
        })
        .catch(function(error) {
          console.log(error)
          _this.$toast.fail('数据请求出错！')
        })
    },
    deleteOrder: function(id) {
      let _this = this
      Axios.post('/shop/order-delete', {
        payId: id
      })
        .then(function(res) {
           _this.$toast.fail('删除订单成功！')
          _this.init()
        })
        .catch(function(error) {
          console.log(error)
          _this.$toast.fail('数据请求出错！')
        })
    },
    updatePassword: function() {
      let _this = this
      this.updatting = true
      if (
        !/\w{5,17}$/.test(this.oldPassword) ||
        !/\w{5,17}$/.test(this.newPassword)
      ) {
        this.$toast.fail('密码格式长度在6~18之间，只能包含字母、数字和下划线！')
        this.updatting = false
        return
      } else if (this.newPassword !== this.newPassword2) {
        _this.$toast.fail('确认密码不一致！')
        this.updatting = false
        return
      }
      Axios.post('/users/update/password', {
        oldPassword: _this.oldPassword,
        newPassword: _this.newPassword
      })
        .then(function(res) {
          console.log(res.data)
          _this.updatting = false
          if (res.data.state === false) {
            _this.$toast.fail('修改失败，请检查密码是否正确！')
          } else if (res.data.state === true) {
            _this.$toast.fail('修改成功！')
            _this.$router.push({
              name: 'Login'
            })
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    updateEmail: function() {
      let _this = this
      this.updatting = true
      if (!/\w{5,17}$/.test(this.oldPassword)) {
        this.$toast.fail('密码格式长度在6~18之间，只能包含字母、数字和下划线！')
        this.updatting = false
        return
      } else if (
        !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.newEmail)
      ) {
        _this.$toast.fail('请填写正确的邮箱！')
        this.updatting = false
        return
      }
      Axios.post('/users/update/email', {
        oldPassword: _this.oldPassword,
        newEmail: _this.newEmail
      })
        .then(function(res) {
          console.log(res.data)
          _this.updatting = false
          if (res.data.state === false) {
            _this.$toast.fail('修改失败，请重试！')
          } else if (res.data.state === true) {
            _this.$toast.fail('修改成功')
            _this.oldPassword = ''
            _this.newEmail = ''
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    goback: function() {
      history.back()
    },
    signOut: function() {
      window.localStorage.removeItem('r_token')
      this.$toast.success('登出成功！')
      this.$router.push({
        name: 'Login'
      })
    }
  },
  computed: {
    hasData: function() {
      return this.Odrders.length === 0 ? false : true
    }
  }
}
</script>

<style lang='less' scoped>
.bg {
  // background-image: url(https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
  //background-size: 100% 100%;
  .content {
    max-width: 1000px;
    margin: auto;
    h2 {
      padding: 40px;
    }
    .order {
      border-top: 1px solid #eeeeee;
    }
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
      padding: 30px 0;
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
      .time {
        height: 30px;
        line-height: 45px;
        margin-right: 30px;
        span {
          font-size: 14px;
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
    .count {
      margin: 40px auto;
      max-width: 500px;
    }
  }
}
.signout-container {
  display: flex;
  flex-direction: row-reverse;
  .signout {
    cursor: pointer;
    text-align: right;
    padding-bottom: 20px;
    img {
      position: relative;
      top: 3px;
      width: 20px;
    }
  }
}
@media (max-width: 767px) {
  .bg {
    // background-image: url(https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
    //background-size: 100% 100%;

    .content {
      h2 {
        padding: 40px;
      }
      .product {
        margin: 15px 0;
        display: flex;
        .product-checked {
          display: flex;
          align-content: center;
          justify-content: center;
          width: 5px;
          min-width: 5px;
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
          width: 100%;
          height: auto;
          padding: 0;
          font-size: 14px;
          margin-bottom: 5px;
          .flex {
            display: flex;
            justify-content: space-between;
          }
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
      .count {
        margin: 40px auto;
        max-width: 300px;
      }
    }
  }
  .signout-container {
    display: none;
  }
}
</style>
