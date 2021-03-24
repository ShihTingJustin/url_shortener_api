const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  urls: [{
    type: Schema.Types.ObjectId,
    ref: "Url"
  }]
},
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)