<template>
  <div class="bg">
    <Header/>
    <Content ref="scrollContent">
      <div class="content">
        <h2 class>{{TypeName}}</h2>
        <div class="count">
          <el-input placeholder="用户名称" v-model="username">
            <template slot="prepend">账号</template>
          </el-input>
        </div>
        <div class="count">
          <el-input placeholder="用于密码找回" v-model="email" @input="checkEmail">
            <template slot="prepend">邮箱</template>
            <div class="input-suffix" slot="suffix">
              <i class="el-icon-circle-check" v-show="!emailErrorTip" style="color:green">
                <span></span>
              </i>
              <i class="el-icon-circle-close" v-show="emailErrorTip" style="color:red">
                <span>格式有误</span>
              </i>
            </div>
          </el-input>
        </div>
        <div class="count" v-if="Password">
          <p>您的密码是：{{Password}}</p>
        </div>
        <div class="count">
          <span class="demonstration">
            拖动滑块至
            <span class="step-key">{{ stepKey }}</span> 完成验证
            <span class="step-change" @click="createStepKey">点击切换</span>
          </span>
          <el-slider v-model="stepValue"></el-slider>
        </div>
        <div class="count">
          <el-button size="medium" round @click="login">去登陆</el-button>
          <el-button
            size="medium"
            type="primary"
            round
            :loading="logging"
            @click="findPassword"
          >找回密码</el-button>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Header from '@/components/common-header'
import Content from '@/components/common-content'
import Axios from '@/service/axiosPlugin'
import { Field } from 'vant'
export default {
  name: 'FindPassword',
  components: {
    Header,
    Content,
    Field,
    Axios
  },
  data() {
    return {
      TypeName: '找回密码',
      username: '',
      email: '',
      emailErrorTip: '',
      logging: false,
      stepKey: 0,
      stepValue: 0,
      Password: false
    }
  },
  mounted() {
    this.createStepKey()
  },
  methods: {
    login: function() {
      this.$router.push({
        name: 'Login'
      })
    },
    findPassword: function() {
      const _this=this
      this.logging = true
      Axios.post('/users/find-password', {
        username: _this.username,
        email: _this.email
      })
        .then(function(res) {
          console.log(res.data)
          _this.logging = false
          if (res.data.state === false) {
            _this.$toast.fail('账号或邮箱错误！')
            _this.createStepKey()
          } else if (res.data.state === true) {
            _this.Password=res.data.data.password
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    checkEmail: function() {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
        this.emailErrorTip = true
      } else {
        this.emailErrorTip = false
      }
    },
    createStepKey: function() {
      let a = Math.random()
      this.stepKey = (100 * a).toFixed()
    }
  }
}
</script>

<style lang='less' scoped>
.bg {
  // background-image: url(https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
  //background-size: 100% 100%;
  .content {
    max-width: 800px;
    margin: 50px auto;
    height: 600px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    h2 {
      padding: 60px;
    }
    .count {
      margin: 40px auto;
      max-width: 500px;
      .input-suffix {
        line-height: 40px;
        font-size: 12px;
        color: #08007a80;
        cursor: pointer;
      }
      .input-suffix:hover {
        color: #09007a;
      }
      .step-key {
        color: #09007a;
        font-size: 18px;
        font-weight: 500;
      }
      .step-change {
        color: #808080;
        font-size: 14px;
        cursor: pointer;
        margin-left: 15px;
      }
    }
  }
}
@media (max-width: 767px) {
  .bg {
    // background-image: url(https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
    //background-size: 100% 100%;
    .content {
      max-width: 800px;
      margin: 50px auto;
      height: 600px;
      box-shadow: none;
      h2 {
        padding: 40px;
      }
      .count {
        margin: 40px auto;
        max-width: 300px;
      }
    }
  }
}
</style>
