<template>
  <div class="bg">
    <Header/>
      <div class="content">
        <h2 class>{{loginTypeName}}</h2>
        <div class="count">
          <el-input placeholder="用户名称" v-model="username" @input="exitUser">
            <template slot="prepend">账号</template>
            <div class="input-suffix" slot="suffix">
              <i class="el-icon-circle-check" v-show="!existuser" style="color:green"></i>
              <i class="el-icon-circle-close" v-show="existuser" style="color:red">
                <span>已注册</span>
              </i>
            </div>
          </el-input>
        </div>
        <div class="count">
          <el-input
            type="password"
            placeholder="长度在6~18之间，只能包含字母、数字和下划线"
            v-model="password"
            show-password
            @input="checkPassword"
          >
            <template slot="prepend">密 码</template>
            <div class="input-suffix" slot="suffix">
              <i class="el-icon-circle-check" v-show="!passwordErrorTip" style="color:green">
                <span></span>
              </i>
              <i class="el-icon-circle-close" v-show="passwordErrorTip" style="color:red">
                <span>格式有误</span>
              </i>
            </div>
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
        <div class="count">
          <span class="demonstration">
            拖动滑块至
            <span class="step-key">{{ stepKey }}</span> 完成验证
            <span class="step-change" @click="createStepKey">点击切换</span>
          </span>
          <el-slider v-model="stepValue"></el-slider>
        </div>
        <div class="count">
          <el-button size="medium" round @click="goLogin">已有账号登录</el-button>
          <el-button size="medium" type="primary" round :loading="registing" @click="register">注册</el-button>
        </div>
        <div class="count">
          <el-checkbox v-model="checked">
            勾选代表你同意
            <a href>《注册声明》</a>
            <a href>《隐私声明》</a>
          </el-checkbox>
        </div>
      </div>
    
  </div>
</template>

<script>
import Header from '@/components/common-header'
import Content from '@/components/common-content'
import Axios from '@/service/axiosPlugin'
import { Field } from 'vant'
export default {
  name: 'Login',
  components: {
    Header,
    Content,
    Field,
    Axios
  },
  data() {
    return {
      loginTypeName: '账号注册',
      username: '',
      password: '',
      passwordErrorTip: false,
      email: '',
      emailErrorTip: '',
      registing: false,
      existuser: false,
      checked: true,
      stepKey: 0,
      stepValue: 0
    }
  },
  mounted() {
    this.createStepKey()
  },
  methods: {
    goLogin: function() {
      this.$router.push({
        name: 'Login'
      })
    },
    checkPassword: function() {
      if (!/\w{5,17}$/.test(this.password)) {
        this.passwordErrorTip = true
      } else {
        this.passwordErrorTip = false
      }
    },
    checkEmail: function() {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
        this.emailErrorTip = true
      } else {
        this.emailErrorTip = false
      }
    },
    register: function() {
      let _this = this
      this.logging = true
      if (!this.username || !this.password) {
        _this.$toast.fail('账号或密码未填写！')
        this.registing = false
        return
      } else if (!/\w{5,17}$/.test(this.password)) {
        this.$toast.fail('密码格式长度在6~18之间，只能包含字母、数字和下划线！')
        this.logging = false
        return
      } else if (
        !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)
      ) {
        _this.$toast.fail('请填写正确的邮箱！')
        this.registing = false
        return
      } else if (parseInt(this.stepKey) !== this.stepValue) {
        this.$toast.fail('请滑动滑块至正确值！')
        this.logging = false
        return
      }
      Axios.post('/users/register', {
        username: _this.username,
        password: _this.password,
        email: _this.email
      })
        .then(function(res) {
          console.log(res.data)
          _this.registing = false
          if (res.data.state === true) {
            _this.$toast.fail('注册成功！')
            _this.$router.push({
              name: 'Login'
            })
          } else if (res.data.state) {
            _this.$toast.success('注册失败！')
            _this.createStepKey()
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    exitUser: function() {
      const _this = this
      Axios.post('/users/register/existuser', {
        username: _this.username
      })
        .then(function(res) {
          console.log(res.data)
          if (res.data.existuser === true) {
            _this.existuser = true
          } else if (res.data.existuser === false) {
            _this.existuser = false
          }
        })
        .catch(function(error) {
          console.log(error)
        })
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
    padding-bottom: 50px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    h2 {
      padding: 60px;
    }
    .count {
      margin: 40px auto;
      max-width: 500px;
      .input-suffix {
        line-height: 40px;
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
      margin: 30px auto;
      box-shadow: none;
      h2 {
        padding: 0px;
      }
      .count {
        margin: 40px auto;
        max-width: 350px;
        padding: 0 15px;
      }
    }
  }
}
</style>
