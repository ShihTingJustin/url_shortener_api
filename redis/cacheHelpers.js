const Url = require('../models/url')
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient(process.env.REDISCLOUD_URL);
const cacheHelpers = {
  createUrlCache: async () => {
    try {
      const urlCacheCount = 5
      const clickCount = 5
      const data = await Url.find(
        { click: { $gte: clickCount } }, // greater than or equivalent 
        ['originalUrl', 'shortUrl', 'click'],
        {
          limit: urlCacheCount,
          sort: { click: -1 } //desc
        }
      )

      for (let i = 0; i < urlCacheCount; i++) {
        await client.set(data[i].shortUrl, JSON.stringify(data[i]))
      }
      
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'unknown error when try to create url cache'
      })
    }
  },

  getUrlCache: async (key) => {
    try {
      return JSON.parse(await client.get(key))
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'unknown error when try to get url cache'
      })
    }
  }

}

module.exports = cacheHelpers