let dbs = require("../util/DBSet");

function addUser(username, password, email) {
  return dbs.admin.create({
    username: username,
    password: password,
    email: email
  }).then(function () {
    return true
  })
}
let updatePassword = async (username, oldPassword, newPassword) => {
  return dbs.admin.find({
    username: username
  }).then(function (doc) {
    console.log(doc)
    if (doc[0].password === oldPassword) {
      return dbs.admin.updateOne({
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
  return dbs.admin.find({
    username: username
  }).then(function (doc) {
    console.log( oldPassword, newEmail)
    if (doc[0].password === oldPassword) {
      return dbs.admin.updateOne({
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
  dbs.admin.delete({
    username: username
  })
}

function existUser(username) {
  return dbs.admin.find({
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
  return dbs.admin.find({
    username: username
  }).exec().then(function (doc) {
    let userInfo = doc[0]
    return userInfo
  })
}

module.exports = {
  existUser,
  addUser,
  updatePassword,
  updateEmail,
  deleteUser,
  verifyUser,
};