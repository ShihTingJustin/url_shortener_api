const Url = require('../url')
const db = require('../../config/mongoose')
const helpers = require('../../helpers')

const originalUrls = [
  'https://www.apple.com/tw/',
  'https://www.apple.com/tw/mac/',
  'https://www.apple.com/tw/mac-pro/',
  'https://www.apple.com/tw/imac/',
  'https://www.apple.com/tw/macbook-pro-16/',
  'https://www.apple.com/tw/macbook-pro-13/',
  'https://www.apple.com/tw/macbook-air/',
  'https://www.apple.com/tw/ipad/',
  'https://www.apple.com/tw/iphone/',
  'https://www.apple.com/tw/watch/'
]

db.once('open', async () => {
  console.log('run seeder...')
  const shortUrlLength = 5
  for (let i = 0; i < 10; i++) {
    await Url.create({
      originalUrl: originalUrls[i],
      shortUrl: `${await helpers.isShortUrlUnique(await helpers.createShortUrl(shortUrlLength))}`,
      click: i
    })
  }
  console.log('seeder complete!')
  process.exit()
})