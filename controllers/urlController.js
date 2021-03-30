const Url = require('../models/url')
const helpers = require('../helpers')
const cacheHelpers = require('../redis/cacheHelpers')

const urlController = {
  createShortUrl: async (req, res) => {
    try {
      const { originalUrl } = req.body
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
        res.status(200).json({
          status: 'success',
          message: 'create shorten url successfully',
          data: {
            originalUrl,
            shortUrl
          }
        })
      }
      return await helpers.getMetaData(originalUrl, shortUrl)
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
          shortUrl: data.shortUrl
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

  getAllUrlsByUser: async (req, res) => {
    try {
      const data = (await Url.find({ userId: req.params.userId }).sort({ createdAt: 'desc' }).exec())
      return res.status(200).json({ data })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'unknown error'
      })
    }
  },

  removeUrl: async (req, res) => {
    try {
      const response = await Url.deleteOne({ _id: req.params.id });
      if (response.deletedCount === 1) {
        return res.status(200).json({
          status: 'success',
          message: 'url removed',
        })
      } else {
        throw new Error('url remove fail')
      }
    } catch (err) {
      console.log(err)
      return res.status(403).json({
        status: 'error',
        message: err.message
      })
    }
  }

}

module.exports = urlController