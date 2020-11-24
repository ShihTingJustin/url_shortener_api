const helpers = require('../../helpers')
const assert = require('assert')
const testData = {
  originalUrl: 'https://www.apple.com/tw/',
  shortUrl: 'A6M3G',
  uniqueUrl: 'https://www.google.com.tw/'
}

describe('helper function test', () => {
  describe('Is original url valid', () => {
    it('should return true when url is valid', async () => {
      assert.strictEqual(await helpers.isOriginalUrlValid(testData.originalUrl), true)
    })
  })

  describe('Create 5 digit short url', () => {
    it('length of short url should be 5', async () => {
      const shortUrl = await helpers.createShortUrl(5)
      assert.strictEqual(shortUrl.length, 5)
    })
  })

  describe('Is short url unique', () => {
    it('should return short url when it is unique', async () => {
      assert.strictEqual(await helpers.isShortUrlUnique(testData.shortUrl), testData.shortUrl)
    })
  })

  describe('Is original url unique', () => {
    it('should return true when it is unique', async () => {
      assert.strictEqual(await helpers.isOriginalUrlUnique(testData.uniqueUrl), true)
    })

    it('should return false when it is not unique', async () => {
      assert.strictEqual(await helpers.isOriginalUrlUnique(testData.originalUrl), false)
    })
  })
})