const express = require('express')
const router = express.Router()
const urlController = require('../controllers/urlController')

router.post('/urls', urlController.createShortUrl)

module.exports = router