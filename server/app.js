var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())

var auth = require('./routes/auth')
var forums = require('./routes/forums')

app.use('/auth', auth)
app.use('/forums', forums)

module.exports = app;
