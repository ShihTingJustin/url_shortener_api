const express = require('express')
const router = express.Router()
const passport = require('../config/passport.js')
const urlController = require('../controllers/urlController')
const userController = require('../controllers/userController')

const authenticated = passport.authenticate('jwt', { session: false })

router.post('/users', userController.createUser)
router.post('/signin', userController.signIn)
router.get('/users/current-user', authenticated, userController.getCurrentUser)
router.get('/urls/all', authenticated, urlController.getAllUrls)
router.post('/urls', authenticated, urlController.createShortUrl)
router.get('/:urls', urlController.getOriginalUrl)
router.delete('/urls/:id', authenticated, urlController.removeUrl)


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
 *    "500":
 *     description: unknown error
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
 *    "500":
 *     description: unknown error
 */

module.exports = router