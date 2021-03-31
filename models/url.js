const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = Schema({
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
  },
  img: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
  { timestamps: true }
)

module.exports = mongoose.model('Url', urlSchema)