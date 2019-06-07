<template>
  <div class="header">
    <div class="header-top"></div>
    <div class="header-container">
      <div class="left">
        <img src="@/assets/img/r.svg" @click="goHomepage" class="hidden-xs cursor-p">
        <img src="@/assets/img/hamburger.svg" @click="showMenu" class="visible-xs">
      </div>
      <div class="center">
        <div class="hidden-xs">
          <div class="navbarList">
            <div
              class="navbar"
              v-for="(item,index) in navBarLists"
              :key="index"
              @click="goList(item.type)"
            >{{ item.name }}</div>
          </div>
        </div>
        <div class="visible-xs">
          <img src="@/assets/img/r.svg" @click="goHomepage" class="visible-xs">
        </div>
      </div>
      <div class="right">
        <div class="hidden-xs">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            size="small"
            v-model="searchData"
          >
            <div :v-show="searchData" class="input-suffix" slot="suffix" @click="searchProduct">
              <span>搜索</span>
            </div>
          </el-input>
        </div>

        <van-icon name="records" info="9" size="25px" @click="goProductEdit" class="shopping-bar"/>
        <van-icon name="contact" size="25px" @click="goPersonal" class="count hidden-xs"/>
      </div>
      <div class="menu" v-show="menuShow">
        <div class="menu-part">
          <van-search
            placeholder="请输入搜索关键词"
            v-model="searchData"
            :search="searchProduct"
            shape="round"
            background="#ffffff"
            show-action
          >
            <div slot="action" @click="searchProduct">搜索</div>
          </van-search>
          <div class="navbarList">
            <div
              class="navbar"
              v-for="(item,index) in navBarLists"
              :key="index"
              @click="goList(item.type)"
            >{{ item.name }}</div>
          </div>
          <div class="tool">
            <van-icon name="contact" size="25px" @click="goPersonal" class="count"/>
            <img v-if="isSigned" src="@/assets/img/signout.svg" class="signout" @click="signOut">
          </div>
        </div>
        <div class="menu-bg" @click="closeMenu"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Search } from 'vant'
import Axios from '@/service/axiosPlugin'
export default {
  name: 'Header',
  component: {
    Search
  },
  data() {
    return {
      searchData: '',
      menuShow: false,
      navBarLists: [
      ]
    }
  },
  methods: {
    goHomepage: function() {
      this.$router.push({
        name: 'HomePage'
      })
    },
    goList: function(type) {
      this.$router.push({
        name: type
      })
    },
    goPersonal: function(type) {
      let token = window.localStorage.getItem('r_token')
      if (token) {
        this.$router.push({
          name: 'PersonalCenter'
        })
        return
      }
      this.$router.push({
        name: 'Login'
      })
    },
    goShoppingBar: function(type) {
      let token = window.localStorage.getItem('r_token')
      if (token) {
        this.$router.push({
          name: 'ShoppingBar'
        })
        return
      }
      this.$router.push({
        name: 'Login'
      })
    },
    showMenu: function() {
      this.menuShow = true
    },
    closeMenu: function() {
      this.menuShow = false
    },
    signOut: function() {
      window.localStorage.removeItem('r_token')
      this.$toast.success('登出成功！')
      this.$router.push({
        name: 'Login'
      })
    },
    goProductEdit: function(type) {
      this.$router.push({
        name: 'ProductEdit'
      })
    },
    searchProduct: function() {
      let _this = this
      console.log(this.searchData)
      Axios.post('/shop/search-product', {
        searchParam: _this.searchData
      })
        .then(function(res) {
          console.log(res.data)
          if (res.data.data.length === 0) {
            _this.$toast.fail('无搜索结果！')
          } else if (res.data.data.length > 0) {
            let uuid = _this.guid()
            console.log(uuid)
            _this.closeMenu()
            _this.$router.push({
              name: 'SearchResult',
              params: {
                searchResult: res.data.data,
                uuid: uuid
              }
            })
          } else {
            _this.$toast.fail('搜索出错，请重试！')
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    guid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
  },
  computed: {
    isSigned: function() {
      let token = window.localStorage.getItem('r_token')
      return token ? true : false
    }
  }
}
</script>

<style lang="less" scoped>
.header-top {
  width: 100%;
  padding-top: 60px;
}
.header-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  display: flex;
  align-items: center;
  border-top: 2px solid #09007a;
  justify-content: space-around;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px 0px rgba(87, 87, 87, 0.09);
  .left {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 55px;
    }
  }
  .center {
    width: 55%;

    .navbarList {
      display: flex;
      align-items: center;
      justify-content: center;
      .navbar {
        width: 120px;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        cursor: pointer;
      }
      .navbar:hover {
        color: #09007a;
        box-shadow: 0px -2px 6px 0px rgba(87, 87, 87, 0.09);
        border-bottom: 2px solid #09007a;
        font-size: 20px;
      }
    }
  }
  .right {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .input-suffix {
      line-height: 32px;
      font-size: 12px;
      color: #08007a80;
      cursor: pointer;
      margin-right: 3px;
    }
    .input-suffix:hover {
      color: #09007a;
    }
    .shopping-bar,
    .count {
      cursor: pointer;
      margin: 0 15px;
    }
  }
}
@media (max-width: 767px) {
  .header-top {
    width: 100%;
    padding-top: 43px;
  }
  .header-container {
    height: 43px;
    .right {
      width: 60px;
    }
    .left {
      width: 60px;
      img {
        width: 25px;
      }
    }
    .center {
      width: calc(100% - 120px);
      display: flex;
      justify-content: center;
      img {
        width: 37px;
      }
    }
    .menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .menu-part {
        position: absolute;
        width: 75%;
        height: 100%;
        z-index: 9;
        background-color: #ffffff;
        animation: animation 0.27s;
        @keyframes animation {
          0% {
            width: 0;
          }
          100% {
            width: 75%;
          }
        }

        .navbarList {
          text-align: left;
          font-size: 20px;
          font-weight: 600;
          line-height: 50px;
          margin-left: 15px;
        }
        .tool {
          position: absolute;
          bottom: 0;
          padding: 10px 0;
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: space-around;
          .signout {
            width: 24px;
            position: relative;
            top: -3px;
          }
        }
      }
      .menu-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 8;
        background-color: #000000;
        opacity: 0.6;
      }
    }
  }
}
</style>
