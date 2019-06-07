<template>
  <div class="bg">
    <Header/>
    <Content>
      <div class="content">
        <h2 class>{{TypeName}}</h2>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-shopping-bag-2"></i> 我的订单
            </span>
            我的订单
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
                  <el-input
                    type="password"
                    placeholder="请输入旧密码"
                    v-model="oldPassword"
                    show-password
                  >
                    <template slot="prepend">旧 的 密 码</template>
                  </el-input>
                </div>
                <div class="count">
                  <el-input
                    type="password"
                    placeholder="请输入新密码"
                    v-model="newPassword"
                    show-password
                  >
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
                  <el-input
                    type="password"
                    placeholder="请输入旧邮箱"
                    v-model="oldPassword"
                    show-password
                  >
                    <template slot="prepend">密 码</template>
                  </el-input>
                </div>
                <div class="count">
                  <el-input type="password" placeholder="请输入新邮箱" v-model="newEmail" show-password>
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
    </Content>
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
      updatting: false
    }
  },
  methods: {
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
      Axios.post('/admin/update/password', {
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
      Axios.post('/admin/update/email', {
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
            _this.oldPassword=''
            _this.newEmail=''
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    goback: function() {
      history.back()
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
      padding: 60px;
    }
    .count {
      margin: 40px auto;
      max-width: 500px;
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
      .count {
        margin: 40px auto;
        max-width: 300px;
      }
    }
  }
}
</style>
