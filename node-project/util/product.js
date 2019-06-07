let dbs = require("./DBSet");

function addProduct(product) {
  return dbs.product.create({
    name: product.name,
    title: product.title,
    colorInfo: product.colorInfo,
    priceDesc: product.priceDesc,
    imgList: product.imgList,
    type: product.type

  }).then(function () {
    return true
  })
}

function updateProduct(id, product) {
  return dbs.product.update({
    _id: id
  }, {
    name: product.name,
    title: product.title,
    colorInfo: product.colorInfo,
    priceDesc: product.priceDesc,
    imgList: product.imgList,
    type: product.type
  }).then(function () {
    return true
  })
}

function findTypeProductBase(type) {
  return dbs.product.find({
      type: type
    }).limit(10)
    .sort({
      '_id': -1
    }).then(function (doc) {
      return doc
    })
}

function findAllProduct(id) {
  if (id) {
    return dbs.product.find({
        '_id': {
          "$lt": id
        }
      }).limit(10)
      .sort({
        '_id': -1
      }).then(function (doc) {
        return doc
      })
  } else {
    return dbs.product.find().limit(10)
      .sort({
        '_id': -1
      }).then(function (doc) {
        return doc
      })
  }

}

function findTypeProductMore(id, type) {
  return dbs.product.find({
      '_id': {
        "$lt": id
      },
      type: type
    }).limit(10)
    .sort({
      '_id': -1
    }).then(function (doc) {
      return doc
    })
}

function findProductDetails(id) {
  return dbs.product.find({
    _id: id
  }).then(function (doc) {
    console.log('doc,,,,', doc)
    return doc
  })
}

function deleteProduct(id) {
  return dbs.product.remove({
    _id: id
  }).then(function (doc) {
    console.log('doc,,,,', doc)
    return true
  })
}

function searchProduct(name) {
  return dbs.product.find({
    name: {
      $regex: name,
      $options: "$i"
    }
  }).then(function (doc) {
    console.log('doc,,,,', doc)
    return doc
  })
}
module.exports = {
  addProduct,
  findTypeProductBase,
  findTypeProductMore,
  findProductDetails,
  findAllProduct,
  searchProduct,
  deleteProduct,
  updateProduct
};