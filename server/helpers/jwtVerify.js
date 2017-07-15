var jwt = require('jsonwebtoken')

var verifyUser = function (req,res,next) {
  jwt.verify(req.headers.token, process.env.JWT, function (err,decoded) {
    if (err) {
      res.status(500).send(err)
    } else {
      req.decoded = decoded
      next()
    }
  })
}

module.exports = {
  verifyUser
};
