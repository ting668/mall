const express = require('express');
const {
  existUser,
  addUser,
  updatePassword,
  updateEmail,
  deleteUser,
  findPassword,
  verifyUser,
} = require('../util/users');
const {
  base64encode,base64decode
} = require('../util/base64');

const router = express.Router();

// 给所有 api 接口都加上默认的 content-type
router.use(function (req, res, next) {
  res.setHeader('content-type', 'application/json;charset=utf-8');
  next();
});
router.post('/login', function (req, res) {
  const {
    username,
    password
  } = req.body;

  if (!username || !password) {
    res.send(
      JSON.stringify({
        state: true,
        message: '登录失败,用户名密码输入无效'
      })
    );
  }
  verifyUser(username).then((userInfo) => {
    console.log(userInfo)
    if (userInfo && userInfo.password === password) {
      const token = base64encode(`${username};${password}`)
      res.send(
        JSON.stringify({
          token: token,
          state: true
        })
      );
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
router.post('/login/pawtip', function (req, res) {
  const {
    username
  } = req.body;
  userPawTip(username).then((data) => {
    console.log(data)
    res.send(
      JSON.stringify(data)
    )
  }).catch((err) => {
    const data = "";
    res.end(
      JSON.stringify(data)
    );
  });
})
router.post('/update/password', function (req, res) {

  const {
    oldPassword,
    newPassword
  } = req.body;
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  console.log(username)
  updatePassword(username, oldPassword, newPassword).then((data) => {
    console.log('data,,,,,,,,,,,,,', data)
    res.send(
      JSON.stringify({
        state: data
      })
    )
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });
})
router.post('/find-password', function (req, res) {

  const {
    username,
    email
  } = req.body;
  findPassword(username, email).then((data) => {
    console.log('data,,,,,,,,,,,,,', data)
    res.send(
      JSON.stringify({
        state: true,
        data:data[0]
      })
    )
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });
})
router.post('/update/email', function (req, res) {

  const {
    oldPassword,
    newEmail
  } = req.body;
  const token = req.headers.authorization
  const [username, password] = base64decode(token).split(';');
  updateEmail(username, oldPassword, newEmail).then((data) => {
    res.send(
      JSON.stringify({
        state: data
      })
    )
  }).catch((err) => {
    res.end(
      JSON.stringify({
        state: false
      })
    );
  });
})
router.post('/register', async function (req, res) {
  const {
    username,
    password,
    email
  } = req.body;
  let userExit = await existUser(username)
  if (!userExit) {
    addUser(username, password, email).then((info) => {
      if (info === true) {
        res.send(
          JSON.stringify({
            state: true
          })
        )
      }
    }).catch((err) => {
      res.send(
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
    )
  }
});
router.post('/register/existuser', function (req, res) {
  const {
    username
  } = req.body;
  existUser(username).then((info) => {
    console.log(info)
    if (info) {
      res.send(
        JSON.stringify({
          existuser: true
        })
      )
    } else {
      res.send(
        JSON.stringify({
          existuser: false
        })
      )
    }

  }).catch((err) => {
    res.send(
      JSON.stringify({
        existuser: false
      })
    );
  });
});
module.exports = router;