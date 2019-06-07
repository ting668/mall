// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/style/common.css'
import ElementUI from 'element-ui';
import '../theme/index.css'
import {
  getClientWidth
} from '@/util'
Vue.use(Vant)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.isMobile = function () {
  let width = getClientWidth()
  if (width < 768) {
    return true
  } else {
    return false
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
