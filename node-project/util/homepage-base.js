let dbs = require("../util/DBSet");

function getHPBaseData() {
  return dbs.hpbase.find({
    type: 'hpbase'
  }).then(function (docs) {
    console.log('docs', docs)
    return docs
  })
}

function setHpBaseCarousel(carousel) {
  console.log('carousel', carousel)
  return dbs.hpbase.updateOne({
    type: 'hpbase'
  }, {
    carousel: carousel
  }).then(function () {
    return true
  })
}

function setHpBaseNewProduct(newproduct) {
  console.log('newproduct', newproduct)
  return dbs.hpbase.updateOne({
    type: 'hpbase'
  }, {
    newProduct: newproduct
  }).then(function () {
    return true
  })
}

function setHpBaseHotProduct(hotproduct) {
  console.log('hotproduct', hotproduct)
  return dbs.hpbase.updateOne({
    type: 'hpbase'
  }, {
    hotProduct: hotproduct
  }).then(function () {
    return true
  })
}
module.exports = {
  getHPBaseData,
  setHpBaseCarousel,
  setHpBaseNewProduct,
  setHpBaseHotProduct
};