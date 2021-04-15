const express = require('express')
const router = express.Router()
const apis = require('./apis')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = require('../swagger/swaggerDoc')

router.use('/api', apis)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)))
router.use('*', (req, res) => res.send('something wrong 😢'))

module.exports = router