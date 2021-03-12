const Url = require('../models/url')
const helpers = require('../helpers')
const cacheHelpers = require('../redis/cacheHelpers')
const domain = 'https://url-shortener-api-server.herokuapp.com/'

const urlController = {
  createShortUrl: async (req, res) => {
    try {
      const { originalUrl } = req.body
      const isUnique = await helpers.isOriginalUrlUnique(originalUrl)
      if (!isUnique) return res.status(400).json({
        status: 'error',
        message: 'original url is existed'
      })

      const isValid = await helpers.isOriginalUrlValid(originalUrl)
      // invalid url
      if (!isValid) return res.status(400).json({
        status: 'error',
        message: 'invalid url'
      })

      // valid url
      const shortUrlLength = 5
      const shortUrl = await helpers.isShortUrlUnique(await helpers.createShortUrl(shortUrlLength))
      if (shortUrl) {
        await Url.create({ originalUrl, shortUrl })
        return res.status(200).json({
          status: 'success',
          message: 'create shorten url successfully',
          data: {
            originalUrl,
            shortUrl
          }
        })
      }

    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'unknown error'
      })
    }
  },

  getOriginalUrl: async (req, res) => {
    try {
      const { urls } = req.params
      // cache exist
      const cache = await cacheHelpers.getUrlCache(urls)
      if (cache) {
        return res.status(200).json({
          status: 'success',
          message: 'get original url successfully',
          data: {
            originalUrl: cache.originalUrl,
            shortUrl: cache.shortUrl
          }
        })
      }

      // cache not exist
      const originalUrl = await Url.findOne({ shortUrl: urls }).exec()
      if (!originalUrl) return res.status(400).json({
        status: 'error',
        message: 'cannot find original url'
      })

      // update shortened URL click count
      const data = await Url.findById(originalUrl._id)
      data.click += 1
      await data.save()
      return res.status(200).json({
        status: 'success',
        message: 'get original url successfully',
        data: {
          originalUrl: data.originalUrl,
          shortUrl: domain + data.shortUrl
        }
      })

    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'unknown error'
      })
    }
  },

  getAllUrls: async (req, res) => {
    try {
      return res.status(200).json({
        data: await Url.find().exec()
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'unknown error'
      })
    }
  }

}

module.exports = urlController