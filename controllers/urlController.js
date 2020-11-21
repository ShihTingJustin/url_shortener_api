const Url = require('../models/url')
const helpers = require('../helpers')

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
      const shortUrl = await helpers.createShortUrl(shortUrlLength)
      const isUnique = await helpers.isShortUrlUnique(shortUrl)
      if (shortUrl && isUnique) {
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
  }

}

module.exports = urlController