const express = require('express');
const {
  setHpBaseCarousel,
  setHpBaseNewProduct,
  setHpBaseHotProduct
} = require('../util/homepage-base');
const {
  addProduct
} = require('../util/product');
const {
  base64decode
} = require('../util/base64');
const {
  verifyUser
} = require('../util/admin');
const {
  findProductDetails,
  deleteProduct,
  updateProduct
} = require('../util/product');
const router = express.Router();

// 给所有 api 接口都加上默认的 content-type
router.use(function (req, res, next) {
  res.setHeader('content-type', 'application/json;charset=utf-8');
  next();
});
router.post('/hpbase/carousel', function (req, res) {
  const {
    imglist
  } = req.body;
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      setHpBaseCarousel(imglist).then((data) => {
        res.end(
          JSON.stringify({
            state: data
          })
        );
      }).catch((err) => {
        res.end(
          JSON.stringify({
            state: false
          })
        );
      });
    } else {
      res.send(
        JSON.stringify({
          state: false
        })
      );
    }
  }).catch((err) => {
    res.end(
      JSON.stringify({
        success: false,
        message: "失败",
        tips: err.message,
      })
    );
  });

});
router.post('/hpbase/newproduct', function (req, res) {
  const {
    newproduct
  } = req.body;
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      setHpBaseNewProduct(newproduct).then((data) => {
        res.end(
          JSON.stringify({
            state: data
          })
        );
      }).catch((err) => {
        res.end(
          JSON.stringify({
            state: false
          })
        );
      });
    } else {
      res.send(
        JSON.stringify({
          state: false
        })
      );
    }
  }).catch((err) => {
    res.end(
      JSON.stringify({
        success: false,
        message: "失败",
        tips: err.message,
      })
    );
  });

});
router.post('/hpbase/hotproduct', function (req, res) {
  const {
    hotproduct
  } = req.body;
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      setHpBaseHotProduct(hotproduct).then((data) => {
        res.end(
          JSON.stringify({
            state: data
          })
        );
      }).catch((err) => {
        res.end(
          JSON.stringify({
            state: false
          })
        );
      });
    } else {
      res.send(
        JSON.stringify({
          state: false
        })
      );
    }
  }).catch((err) => {
    res.end(
      JSON.stringify({
        success: false,
        message: "失败",
        tips: err.message,
      })
    );
  });

});
router.post('/product/add', function (req, res) {
  const {
    newproduct
  } = req.body;
  const token = req.headers.authorization
  console.log('newproduct,,,,', newproduct[0].colorInfo[0].sizeInfo[0])
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      addProduct(newproduct[0]).then((data) => {
        console.log('data',data)
        res.end(
          JSON.stringify({
            state: data
          })
        );
      }).catch((err) => {
        res.end(
          JSON.stringify({
            state: false
          })
        );
      });
    } else {
      res.send(
        JSON.stringify({
          state: false
        })
      );
    }
  }).catch((err) => {
    res.end(
      JSON.stringify({
        success: false,
        message: "失败",
        tips: err.message,
      })
    );
  });

});
router.post('/product/find', function (req, res) {
  const {
    id
  } = req.body;
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      findProductDetails(id).then((data) => {
        console.log('data',data)
        res.end(
          JSON.stringify({
            state: data
          })
        );
      }).catch((err) => {
        res.end(
          JSON.stringify({
            state: false
          })
        );
      });
    } else {
      res.send(
        JSON.stringify({
          state: false
        })
      );
    }
  }).catch((err) => {
    res.end(
      JSON.stringify({
        success: false,
        message: "失败",
        tips: err.message,
      })
    );
  });

});
router.post('/product/update', function (req, res) {
  const {
    id,
    newproduct
  } = req.body;
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      updateProduct(id,newproduct[0]).then((data) => {
        console.log('data',data)
        res.end(
          JSON.stringify({
            state: data
          })
        );
      }).catch((err) => {
        res.end(
          JSON.stringify({
            state: false
          })
        );
      });
    } else {
      res.send(
        JSON.stringify({
          state: false
        })
      );
    }
  }).catch((err) => {
    res.end(
      JSON.stringify({
        success: false,
        message: "失败",
        tips: err.message,
      })
    );
  });

});
router.post('/product/delete', function (req, res) {
  const {
    id
  } = req.body;
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      deleteProduct(id).then((data) => {
        res.end(
          JSON.stringify({
            state: data
          })
        );
      }).catch((err) => {
        res.end(
          JSON.stringify({
            state: false
          })
        );
      });
    } else {
      res.send(
        JSON.stringify({
          state: false
        })
      );
    }
  }).catch((err) => {
    res.end(
      JSON.stringify({
        success: false,
        message: "失败",
        tips: err.message,
      })
    );
  });

});
module.exports = router;