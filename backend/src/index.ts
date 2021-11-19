import express from 'express'
import logging from './config/logging'
import config from './config/config'
import firebaseAdmin from 'firebase-admin'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from './api/routes/user'
import blogRouter from './api/routes/blog'

const app = express()

// Middleware
app.use(
   cors({
      credentials: true,
      origin: ['*', 'http://localhost:3000', 'http://localhost'],
   })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connection to Firebase Admin
let serviceAccountKey = require('./config/serviceAccountKey.json')

firebaseAdmin.initializeApp({
   credential: firebaseAdmin.credential.cert(serviceAccountKey),
})

// Connect to Mongo
mongoose
   .connect(config.mongo.url, config.mongo.options)
   .then(() => {
      logging.info('Mongo connected.')
   })
   .catch((e) => {
      logging.error(e)
   })

// logging middleware
app.use((req, res, next) => {
   logging.info(
      `METHOD: '${req.method}' URL: '${req.url}' - IP: '${req.socket.remoteAddress}'`
   )

   res.on('finish', () => {
      logging.info(
         `METHOD: '${req.method}' URL: '${req.url}' - IP: '${req.socket.remoteAddress}' - STATUS: '${req.statusCode}' `
      )
   })

   next()
})

// Parse the body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// API Access Policies
app.use((req, res, next) => {
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
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

// Error Handling
app.use((req, res, next) => {
   const error = new Error('not found')

   return res.status(404).json({
      message: error.message,
   })
})

// Listen for request
app.listen(config.server.port, () => {
   logging.info(`Server is running at ${config.server.port} ...`)
})
