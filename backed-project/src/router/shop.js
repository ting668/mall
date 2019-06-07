import Login from '@/views/login'
import Register from '@/views/register'
import PersonalCenter from '@/views/personal-center'
import Details from '@/views/product-details'
import ShoppingBar from '@/views/shopping-bar'
import ProductEdit from '@/views/product-edit'
import ProductUpdate from '@/views/product-update'
const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
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
  }, {
    path: '/product-edit',
    name: 'ProductEdit',
    component: ProductEdit
  }, {
    path: '/product-update',
    name: 'ProductUpdate',
    component: ProductUpdate
  }
]

export default routes
