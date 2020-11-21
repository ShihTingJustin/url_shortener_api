const express = require('express')
const router = express.Router()
const urlController = require('../controllers/urlController')

router.post('/urls', urlController.createShortUrl)
router.get('/:urls', urlController.getOriginalUrl)

module.exports = router