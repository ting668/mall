let dbs = require("../util/DBSet");

function addUser(username, password, email) {
  return dbs.user.create({
    username: username,
    password: password,
    email: email
  }).then(function () {
    return true
  })
}
let findPassword = async (username, email) => {
  return dbs.user.find({
    username: username
  }).then(function (doc) {
    console.log(doc)
    if (doc[0].email === email) {
     return doc
    } else {
      return false
    }
  })

}
let updatePassword = async (username, oldPassword, newPassword) => {
  return dbs.user.find({
    username: username
  }).then(function (doc) {
    console.log(doc)
    if (doc[0].password === oldPassword) {
      return dbs.user.updateOne({
        username: username
      }, {
        password: newPassword
      }).then(function(){
        return true
      })
    } else {
      return false
    }
  })

}
let updateEmail = async (username, oldPassword, newEmail) => {
  return dbs.user.find({
    username: username
  }).then(function (doc) {
    console.log( oldPassword, newEmail)
    if (doc[0].password === oldPassword) {
      return dbs.user.updateOne({
        username: username
      }, {
        email: newEmail
      }).then(function(){
        return true
      })
    } else {
      return false
    }
  })

}
let deleteUser = async (username) => {
  user.delete({
    username: username
  })
}

function existUser(username) {
  return dbs.user.find({
    username: username
  }).exec().then(function (doc) {
    console.log(doc.length)
    if (doc.length === 0) {
      return false
    } else {
      return true
    }
  })
}

function verifyUser(username) {
  return dbs.user.find({
    username: username
  }).exec().then(function (doc) {
    let userInfo = doc[0]
    return userInfo
  })
}

module.exports = {
  existUser,
  addUser,
  findPassword,
  updatePassword,
  updateEmail,
  deleteUser,
  verifyUser,
};