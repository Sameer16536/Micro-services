const express = require('express')
const router = express.Router()

router.post('/register')
router.post('/login')
router.get('/logout')
router.get('/profile')
router.patch('/toggle-availability')
router.get('/new-ride')


module.exports = router

