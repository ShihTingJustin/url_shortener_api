const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
let HOST = process.env.HOST || 'localhost:3000'
HOST = HOST.replace('http://', '')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API Server',
      version: '1.0.0',
      description: 'Create shorter aliases for long URLs and redirect to the original URL by short links.',
      servers: [HOST]
    }
  },
  apis: ['./routes/apis.js']
}

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)))
}