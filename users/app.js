const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const userRoutes = require('../users/routes/user.routes')
const cookieParser = require('cookie-parser')
const rabbitMq =require('./service/rabbit')
rabbitMq.connect()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/',userRoutes)

module.exports = app