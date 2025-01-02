const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()
const app = express()
const captainRoutes = require('./routes/captain.routes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const rabbitMQ = require('./service/rabbit')
rabbitMQ.connect()


app.use('/',captainRoutes)

module.exports = app