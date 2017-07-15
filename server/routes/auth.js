var router = require('express').Router()
var authControllers = require('../controllers/authControllers')

router.post('/signup', authControllers.signUp)
router.post('/signin', authControllers.signIn)

module.exports = router;
