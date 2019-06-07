const { base64decode } = require('../util/base64');
const { verifyUser, updateUser, deleteUser, existUser } = require('../util/users');

// 认证控制, 如果没有通过认证都会拦截 
const authFilterHandle = (req, res, next) => {
    if (!req.url.startsWith('/article') && !req.url.startsWith('/blog')&& !req.url.startsWith('/api')&& !req.url.startsWith('/upload')) {
      const  token = req.headers.Authorization
        if (!token) {
            JSON.stringify({
                没有认证
            })
        }
        const [username, password] = base64decode(token).split(';');       
        if (!username || !password) {
            JSON.stringify({
                没有认证
            })
        }
        verifyUser(username).then((userInfo) => {
            if (userInfo && userInfo.passWord === password) {
                next();
                console.log("认证通过！")
            } else {
                return Promise.reject(new Error('用户名或密码错误!'));
            }
        }).catch((err) => {
            res.end(
                JSON.stringify({
                    success: false,
                    message: "error"
                })
            );
        });
    } else {
        next();
    }
}

module.exports = authFilterHandle;