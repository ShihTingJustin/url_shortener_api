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
          data: {
            originalUrl,
            shortUrl
          },
          message: 'create shorten url successfully'
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        status: 'error',
        message: 'unknown error'
      })
    }
  }

}

module.exports = urlController