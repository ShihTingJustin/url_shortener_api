const Url = require('./models/url')
const axios = require('axios')
const { nanoid } = require('nanoid')
const got = require('got')
const metascraper = require('metascraper')([
  require('metascraper-image')(),
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-url')()
])

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
      else return isShortUrlUnique(createShortUrl())
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

  getMetaData: async (originalUrl, shortUrl) => {
    const { body: html, url } = await got(originalUrl)
    const metaData = await metascraper({ html, url })
    if (metaData) {
      const data = await Url.findOne({ shortUrl })
      data.img = metaData.image
      data.title = metaData.title
      data.description = metaData.description
      await data.save()
    }
    return
  }
}