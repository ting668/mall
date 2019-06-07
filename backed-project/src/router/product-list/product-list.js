import Pad from '@/views/product-list/pad'
import Pc from '@/views/product-list/pc'
import Phone from '@/views/product-list/phone'
import Support from '@/views/product-list/support'
import SearchResult from '@/views/product-list/search-result'
const routes = [{
  path: '/product-list/pad',
  name: 'Pad',
  component: Pad
},
{
  path: '/product-list/pc',
  name: 'Pc',
  component: Pc
},
{
  path: '/product-list/phone',
  name: 'Phone',
  component: Phone
},
{
  path: '/product-list/support',
  name: 'Support',
  component: Support
},{
  path: '/product-list/search-result/:uuid',
  name: 'SearchResult',
  component: SearchResult
}]

export default routes
