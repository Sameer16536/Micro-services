const express = require('express')
const app = express()
const proxy = require('http-proxy-middleware')

app.use('/stress-test', proxy({ target: 'http://localhost:3002', changeOrigin: true }))
app.use('/', proxy({ target: 'http://localhost:3001', changeOrigin: true }))


app.listen(3000, () => {    
    console.log('gateway service is running on port 3000!')
    })

    