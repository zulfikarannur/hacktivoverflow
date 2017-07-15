var User = require('../models').User
var hash = require('object-hash')
var jwt = require('jsonwebtoken')

var signUp = function (req,res) {
  User.create({
    fullname: req.body.fullname,
    email: req.body.email,
    password: hash(req.body.password),
    username: req.body.username
  })
  .then(function (userResult) {
    res.send(userResult)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var signIn = function (req,res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(function (findResult) {
    if (!findResult) {
      res.send({msg: `Email not found`})
    } else {
      if (findResult.password == hash(req.body.password)) {
        res.send({token: jwt.sign({id: findResult.id}, process.env.JWT ), fullname: findResult.fullname})
      } else {
        res.status(401).send({msg: `Password not match`})
      }
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  signUp,
  signIn
};
