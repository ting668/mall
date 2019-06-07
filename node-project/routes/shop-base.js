const express = require('express');
const {
  getHPBaseData
} = require('../util/homepage-base');
const {
  getNavBaseData
} = require('../util/navbar-base');
const {
  findTypeProductBase,
  findTypeProductMore,
  findAllProduct,
  findProductDetails,
  searchProduct
} = require('../util/product');
const {
  addPreorder,
  verifyPreoder,
  getPreoder,
  deletePreoder
} = require('../util/shopcar');
const {
  addOrder,
  findOrder,
  findAllOrder,
  updateOrderExpress,
  updateOrderReceive,
  deleteOrder
} = require('../util/order');
const {
  getNowFormatDate
} = require('../util/time');
const {
  base64decode
} = require('../util/base64');
const {
  verifyUser,
} = require('../util/users');
const router = express.Router();

// 给所有 api 接口都加上默认的 content-type
router.use(function (req, res, next) {
  res.setHeader('content-type', 'application/json;charset=utf-8');
  next();
});
router.get('/homepage', function (req, res) {
  getHPBaseData().then((data) => {
    console.log(data)
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.post('/search-product', function (req, res) {
  let {
    searchParam
  } = req.body
  searchProduct(searchParam).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    console.log(err)
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.get('/pc', function (req, res) {
  getNavBaseData().then((data) => {
    console.log(data)
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.post('/homepage/more', function (req, res) {
  let {
    id
  } = req.body
  findAllProduct(id).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    console.log(err)
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.get('/pc/more', function (req, res) {
  let type = 'pc'
  findTypeProductBase(type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.post('/pc/more', function (req, res) {
  let {
    id
  } = req.body
  let type = 'pc'
  findTypeProductMore(id, type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    console.log(err)
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.get('/phone/more', function (req, res) {
  let type = 'phone'
  findTypeProductBase(type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.post('/phone/more', function (req, res) {
  let {
    id
  } = req.body
  let type = 'phone'
  findTypeProductMore(id, type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    console.log(err)
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.get('/pad/more', function (req, res) {
  let type = 'pad'
  findTypeProductBase(type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.post('/pad/more', function (req, res) {
  let {
    id
  } = req.body
  let type = 'pad'
  findTypeProductMore(id, type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    console.log(err)
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.get('/mp3/more', function (req, res) {
  let type = 'mp3'
  findTypeProductBase(type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.post('/mp3/more', function (req, res) {
  let {
    id
  } = req.body
  let type = 'mp3'
  findTypeProductMore(id, type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    console.log(err)
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.get('/support/more', function (req, res) {
  let type = 'support'
  findTypeProductBase(type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.post('/support/more', function (req, res) {
  let {
    id
  } = req.body
  let type = 'support'
  findTypeProductMore(id, type).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    console.log(err)
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.post('/product-details', function (req, res) {
  let {
    id
  } = req.body
  findProductDetails(id).then((data) => {
    res.end(
      JSON.stringify({
        data
      })
    );
  }).catch((err) => {
    console.log(err)
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });

});
router.post('/add-shopcar', function (req, res) {
  let {
    productInfo,
    number
  } = req.body
  const token = req.headers.authorization
  console.log(token)
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      verifyPreoder(productInfo).then((doc) => {
        addPreorder(username, productInfo, number).then((data) => {
          res.end(
            JSON.stringify({
              data
            })
          );
        }).catch((err) => {
          console.log(err)
          res.end(
            JSON.stringify({
              state: false
            })
          );
        });
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
router.get('/get-shopcar', function (req, res) {
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      getPreoder(username).then((doc) => {
        res.end(
          JSON.stringify({
            state: true,
            data: doc
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
router.post('/delete-shopcar', function (req, res) {
  let {
    id
  } = req.body
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      deletePreoder(id).then((doc) => {
        res.end(
          JSON.stringify({
            state: doc
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
router.post('/order-product', function (req, res) {
  let {
    orderList
  } = req.body
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  const time = getNowFormatDate()
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      addOrder(username, time, orderList).then((data) => {
        for (let i = 0; i < orderList.productList.length; i++) {
          deletePreoder(orderList.productList[i]._id).then((doc) => {}).catch((err) => {
            res.end(
              JSON.stringify({
                state: false
              })
            );
          });
        }
        console.log('daweeeeeeeeeeeeeeta', data)
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
router.get('/order-product', function (req, res) {
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  const time = getNowFormatDate()
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      findAllOrder(username).then((data) => {
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
router.post('/order-pay', function (req, res) {
  let {
    payId
  } = req.body
  const token = req.headers.authorization
  console.log("你好")
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      findOrder(payId).then((data) => {
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
router.post('/order-payed', function (req, res) {
  let {
    payId,expressInfo
  } = req.body
  const token = req.headers.authorization
  console.log("payId,expressInfo",payId,expressInfo)
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      updateOrderExpress(payId,expressInfo).then((data) => {
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
router.post('/order-received', function (req, res) {
  let {
    payId
  } = req.body
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      updateOrderReceive(payId).then((data) => {
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
router.post('/order-delete', function (req, res) {
  let {
    payId
  } = req.body
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  verifyUser(username).then((userInfo) => {
    if (userInfo && userInfo.password === password) {
      deleteOrder(payId).then((data) => {
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