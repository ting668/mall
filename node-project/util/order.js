let dbs = require("./DBSet");

function addOrder(username, time, orderList) {
  return dbs.order.create({
    username: username,
    time: time,
    state: "待支付",
    orderList: orderList
  }).then(function (doc) {
    return doc._id
  })
}

function updateOrderExpress(id, expressInfo) {
  console.log('212222222222222',id, expressInfo)
  return dbs.order.updateOne({
    _id: id
  }, {
    expressInfo: expressInfo,
    state: "待收货",
  }).then(function () {
    return true
  })
}
function updateOrderReceive(id) {
  return dbs.order.updateOne({
    _id: id
  }, {
    state: "已收货",
  }).then(function () {
    return true
  })
}
function deleteOrder(id) {
  console.log('1222222222222222222222',id)
  return dbs.order.remove({
    _id: id
  }).then(function () {
    return true
  })
}
function findAllOrder(username) {
  return dbs.order.find({
    username: username
  }).then(function (doc) {
    console.log('find222222', doc)
    return doc
  })
}

function findOrder(id) {
  return dbs.order.find({
    _id: id,
  }).then(function (doc) {
    console.log('find222222', doc)
    return doc
  })
}
module.exports = {
  addOrder,
  findOrder,
  findAllOrder,
  updateOrderExpress,
  updateOrderReceive,
  deleteOrder
};