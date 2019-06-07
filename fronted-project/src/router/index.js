import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/home-page'
import Shop from './shop'
import productList from './product-list/product-list'

Vue.use(Router)

export default new Router({
  routes: [
    ...Shop,
    ...productList,
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '*',
      redirect: '/',
    }
  ]
})
