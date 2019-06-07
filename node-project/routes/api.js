const express = require('express');
const { verifyUser, updateUser, deleteUser, userPawTip, existUser, addUser } = require('../util/users');
const { base64encode, base64decode } = require('../util/base64');
var cookie = require('cookie');
// var parse = require('./lib/parse');
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
        throw (new Error('登录失败,用户名密码输入无效'))
    }
    verifyUser(username).then((userInfo) => {
        console.log(userInfo)
        if (userInfo && userInfo.passWord === password) {
            const token = base64encode(`${username};${password}`)
            //   console.log('token',token)
            //     res.cookie('ting', { 'username': userInfo.userName, 'password': userInfo.password}, { maxAge: 900000 })
            //    // res.send(JSON.stringify({ success: 'super' }))
            //    var cookies = req.cookies;
            //  //  req.cookies = Object.create(null);    //创建一个对象，解析后的且未使用签名的cookie保存在req.cookies中
            //   // req.cookies = cookie.parse(cookies);    //与express中调用cookie.serialize()对应，解析cookie
            //    //   req.cookies = JSON.Cookies(req.cookies);  JSON字符序列转化为JSON对象
            //    //var value = req.cookies.username
            //     // [username, password] = base64decode(qq).split(';')
            // //    console.log('qq', base64encode(`${username};${password}`))
            //   console.log('cookies',cookies)
            //    console.log('password',password)
            res.send(
                JSON.stringify({ token: token, state: true})
            );
        } else {
            res.send(
                JSON.stringify({ state: false })
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
        const data="";
        res.end(
            JSON.stringify(data)
        );
    });
})
router.post('/register', async function (req, res) {
    const {
        username,
        password,
        pawtip
    } = req.body;
    let userExit = await existUser(username)
    if (!userExit) {
        addUser(username, password, pawtip).then((info) => {
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
    }
    else {
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
        }
        else {
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