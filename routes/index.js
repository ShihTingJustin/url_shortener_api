const express = require('express')
const router = express.Router()
const apis = require('./apis')

router.use('/api', apis)

module.exports = router