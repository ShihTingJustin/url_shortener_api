const express = require('express')
const router = express.Router()
const apis = require('./apis')

router.use('/api', apis)
router.use('*', (req, res) => res.send('something wrong 😢'))

module.exports = router