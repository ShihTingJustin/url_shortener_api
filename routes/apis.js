const express = require('express')
const router = express.Router()
const urlController = require('../controllers/urlController')

router.post('/urls', urlController.createShortUrl)
router.get('/:urls', urlController.getOriginalUrl)

/**
 * @swagger
 * definitions:
 *  Urls:
 *   type: object
 *   properties:
 *    originalUrl:
 *     type: string
 *     description: origin url
 *     example: 'https://www.mercedes-benz.com.tw'
 *
 * /api/urls:
 *  post:
 *   tags:
 *   - "URL"
 *   summary: create short url
 *   allowEmptyValue: true
 *   requestBody:
 *    content:
 *     application/x-www-form-urlencoded:
 *      schema:
 *       $ref: '#/definitions/Urls'
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: bad request
 *
 * /api/{urls}:
 *  get:
 *   tags:
 *   - "URL"
 *   summary: get original url
 *   allowEmptyValue: true
 *   parameters:
 *   - name: "urls"
 *     in: path
 *     description: "short url"
 *     type: "string"
 *
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: bad request
 */

module.exports = router