let dbs = require("../util/DBSet");

function getNavBaseData() {
  return dbs.navbase.find({
    type: hpbase
  }, function (err, docs) {
    console.log('err',err)
    console.log('docs',docs)
    return docs
  })
}

function setNavBaseCarousel(carousel) {
  return dbs.user.updateOne({
    type: hpbase
  }, {
    carousel: carousel
  }).then(function () {
    return true
  })
}
module.exports = {
  getNavBaseData,
  setNavBaseCarousel
};