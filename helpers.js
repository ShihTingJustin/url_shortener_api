const Url = require('./models/url')
const axios = require('axios')
const { nanoid } = require('nanoid')

module.exports = {
  isOriginalUrlValid: async (url) => {
    try {
      const res = await axios.get(url)
      return (res.status === 200) ? true : false
    } catch (err) {
      console.log(err)
    }
  },

  createShortUrl: async (length) => {
    return await nanoid(length)
  },

  isShortUrlUnique: async (shortUrl) => {
    try {
      const checkShortUrl = await Url.findOne({ shortUrl }).exec()
      if (!checkShortUrl) return shortUrl
      else isShortUrlUnique(createShortUrl())
    } catch (err) {
      console.log(err)
    }
  },

  isOriginalUrlUnique: async (originalUrl) => {
    try {
      const checkOriginalUrl = await Url.findOne({ originalUrl }).exec()
      if (!checkOriginalUrl) return true
      else return false
    } catch (err) {
      console.log(err)
    }
  },
}