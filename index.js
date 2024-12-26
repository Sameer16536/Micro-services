const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.get('/', (req, res) => {
    for (let i = 0; i < 100000000; i++) {
    }
    
    res.send('Hello World! from Index.js')
    })


app.listen(3001, () => {
    console.log('stress service is running on port 3002!')
    })  