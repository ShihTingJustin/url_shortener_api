const mongoose = require('mongoose')
const urlSchema = mongoose.Schema({
  originalUrl: {
    type: String,
    require: true
  },
  shortUrl: {
    type: String,
    require: true,
    unique: true
  },
  click: {
    type: Number,
    default: '0'
  }
})

module.exports = mongoose.model('Url', urlSchema)