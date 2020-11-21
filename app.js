const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
}) 