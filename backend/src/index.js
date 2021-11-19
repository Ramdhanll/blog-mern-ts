'use strict'
exports.__esModule = true
var express_1 = require('express')
var logging_1 = require('./config/logging')
var config_1 = require('./config/config')
var firebase_admin_1 = require('firebase-admin')
var mongoose_1 = require('mongoose')
var app = express_1['default']()
// Server Handling
// const httpServer = http.createServer(app)
// Connection to Firebase Admin
var serviceAccountKey = require('./config/serviceAccountKey.json')
firebase_admin_1['default'].initializeApp({
   credential: firebase_admin_1['default'].credential.cert(serviceAccountKey),
})
// Connect to Mongo
mongoose_1['default']
   .connect(config_1['default'].mongo.url, config_1['default'].mongo.options)
   .then(function () {})
   ['catch'](function (e) {
      logging_1['default'].error(e)
   })
// logging middleware
app.use(function (req, res, next) {
   logging_1['default'].info(
      "METHOD: '" +
         req.method +
         "' URL: '" +
         req.url +
         "' - IP: '" +
         req.socket.remoteAddress +
         "'"
   )
   res.on('finish', function () {
      logging_1['default'].info(
         "METHOD: '" +
            req.method +
            "' URL: '" +
            req.url +
            "' - IP: '" +
            req.socket.remoteAddress +
            "' - STATUS: '" +
            req.statusCode +
            "' "
      )
   })
   next()
})
// Parse the body
app.use(express_1['default'].urlencoded({ extended: true }))
app.use(express_1['default'].json())
// API Access Policies
app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*')
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
   )
   if (req.method === 'OPTIONS') {
      res.header(
         'Access-Control-Allow-Methods',
         'PUT, POST, PATCH, DELETE, GET'
      )
      return res.status(200).json({})
   }
   next()
})
// Routes
// Error Handling
app.use(function (req, res, next) {
   var error = new Error('not found')
   return res.status(404).json({
      message: error.message,
   })
})
// Listen for request
app.listen(config_1['default'].server.port, function () {
   logging_1['default'].info(
      'Server is running at ' + config_1['default'].server.port + ' ...'
   )
})
