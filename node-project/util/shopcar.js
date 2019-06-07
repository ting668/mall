let dbs = require("./DBSet");

function addPreorder(username, product, num) {
  console.log('test', username, product, num)
  return dbs.shopcar.create({
    username: username,
    productInfo: product,
    number: num,
  }).then(function () {
    return true
  })
}

function verifyPreoder(product) {
  return dbs.shopcar.find({
    productInfo: product
  }).exec().then(function (doc) {
    console.log(doc)
    if (doc === []) {
      return false
    }
    return true
  })
}

function getPreoder(username) {
  return dbs.shopcar.find({
    username: username
  }).then(function (doc) {
    console.log(doc)
    if (doc === []) {
      return false
    }
    return doc
  })
}

function deletePreoder(id) {
  return dbs.shopcar.deleteOne({
    _id: id
  }).then(function (doc) {
    console.log(doc)
    return doc
  })
}
module.exports = {
  addPreorder,
  verifyPreoder,
  getPreoder,
  deletePreoder
};