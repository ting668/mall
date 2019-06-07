<template>
  <div class="bg">
    <Header/>
    <Content ref="scrollContent">
      <div class="content">
        <h2 class>{{loginTypeName}}</h2>
        <div class="count">
          <el-input placeholder="用户名称" v-model="username">
            <template slot="prepend">账号</template>
          </el-input>
        </div>
        <div class="count">
          <el-input type="password" placeholder="用户密码" v-model="password" show-password>
            <template slot="prepend">密 码</template>
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
          <el-button size="medium" round @click="goRegister">注册</el-button>
          <el-button size="medium" type="primary" round :loading="logging" @click="login">登录</el-button>
        </div>
        <div class="count">
          <el-checkbox v-model="checked">
            勾选代表你同意
            <a href>《注册声明》</a>
            <a href>《隐私声明》</a>
          </el-checkbox>
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
  name: 'Login',
  components: {
    Header,
    Content,
    Field,
    Axios
  },
  data() {
    return {
      loginTypeName: '账号登录',
      username: '',
      password: '',
      logging: false,
      checked: true,
      stepKey: 0,
      stepValue: 0
    }
  },
  mounted() {
    this.createStepKey()
    this.$nextTick(() => {
      this.$refs.scrollContent.refresh()
    })
  },
  methods: {
    login: function() {
      let _this = this
      this.logging = true
      if (!this.username || !this.password) {
        this.$toast.fail('账号或密码未填写！')
        this.logging = false
        return
      } else if (!/\w{5,17}$/.test(this.password)) {
        this.$toast.fail('密码格式长度在6~18之间，只能包含字母、数字和下划线！')
        this.logging = false
        return
      } else if (parseInt(this.stepKey) !== this.stepValue) {
        this.$toast.fail('请滑动滑块至正确值！')
        this.logging = false
        return
      }
      Axios.post('/admin/login', {
        username: _this.username,
        password: _this.password
      })
        .then(function(res) {
          console.log(res.data)
          _this.registing = false
          _this.logging = false
          if (res.data.state === false) {
            _this.$toast.fail('账号或密码错误！')
            _this.createStepKey()
          } else if (res.data.token) {
            window.localStorage.setItem('r_token', res.data.token)
            _this.$toast.success('登录成功！')
            _this.$router.push({
              name: 'HomePage'
            })
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    goRegister: function() {
      this.$router.push({
        name: 'Register'
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
    height: 600px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    h2 {
      padding: 60px;
    }
    .count {
      margin: 40px auto;
      max-width: 500px;
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
