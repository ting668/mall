<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" info="5">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" info="20">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Footer',
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      active: 1
    }
  }
}
</script>

<style>
</style>
