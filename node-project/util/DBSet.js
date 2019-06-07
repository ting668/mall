const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ting-design')

const Navbase = new mongoose.Schema({
  newProduct: Array
}, {
  collection: 'navbase'
})

const Hpbase = new mongoose.Schema({
  carousel: Array,
  newProduct: Array,
  hotProduct: Array,
  type: String
}, {
  collection: 'hpbase'
})

const Users = new mongoose.Schema({
  username: String,
  password: String,
  email: String
}, {
  collection: 'users'
})
const Admin = new mongoose.Schema({
  username: String,
  password: String,
  email: String
}, {
  collection: 'admin'
})
const Product = new mongoose.Schema({
  name: String,
  title: String,
  priceDesc:String,
  colorInfo: Array,
  imgList: Array,
  type: String
}, {
  collection: 'product'
})
const Shopcar = new mongoose.Schema({
  username:String,
  productInfo: Object,
  number: String,
  orderNum:String,
  payNum: String,
  expressNum: String,
  support: String
}, {
  collection: 'shopcar'
})
const Order= new mongoose.Schema({
  username:String,
  orderList: Object,
  time: String,
  orderNum:String,
  state: String,
  expressInfo:Object
}, {
  collection: 'order'
})
const dbs = {}
dbs.navbase = mongoose.model('navbase', Navbase)
dbs.user = mongoose.model('users', Users)
dbs.hpbase = mongoose.model('hpbase', Hpbase)
dbs.admin = mongoose.model('admin', Admin)
dbs.product = mongoose.model('product', Product)
dbs.shopcar = mongoose.model('shopcar', Shopcar)
dbs.order = mongoose.model('order', Order)
module.exports = dbs;