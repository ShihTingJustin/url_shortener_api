const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
require('./config/mongoose')
require('./redis/config')
require('./redis/cacheHelpers').createUrlCache()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
}) 

module.exports = app