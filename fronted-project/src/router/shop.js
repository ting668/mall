import Login from '@/views/login'
import Register from '@/views/register'
import FindPassword from '@/views/find-password'
import PersonalCenter from '@/views/personal-center'
import Details from '@/views/product-details'
import ShoppingBar from '@/views/shopping-bar'
import OrderPay from '@/views/order-pay'
const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }, 
  {
    path: '/find-password',
    name: 'FindPassword',
    component: FindPassword
  },{
    path: '/personal-center',
    name: 'PersonalCenter',
    component: PersonalCenter
  },
  {
    path: '/product-details',
    name: 'Details',
    component: Details
  },
  {
    path: '/shopping-bar',
    name: 'ShoppingBar',
    component: ShoppingBar
  }
  ,
  {
    path: '/order-pay',
    name: 'OrderPay',
    component: OrderPay
  }
]

export default routes
