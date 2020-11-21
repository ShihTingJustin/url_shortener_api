const Url = require('../url')
const db = require('../../config/mongoose')
const helpers = require('../../helpers')

db.once('open', async () => {
  console.log('run seeder...')
  const shortUrlLength = 5
  for (let i = 0; i < 100; i++) {
    await Url.create({
      originalUrl: 'https://www.apple.com/tw/',
      shortUrl: `${await helpers.isShortUrlUnique(await helpers.createShortUrl(shortUrlLength))}`,
      click: i
    })
  }
  console.log('seeder complete!')
  process.exit()
})