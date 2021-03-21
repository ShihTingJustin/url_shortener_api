const Url = require('../../models/url')
const assert = require('assert')
const request = require('supertest')
const app = require('../../app')
const testData = {
  originalUrl: 'https://www.apple.com/tw/',
  shortUrl: 'A6M3G',
  uniqueUrl: 'https://www.google.com.tw/',
  invalidUrl: 'https://12489gsd8564w8eg'
}

describe('api test', () => {
  before(async () => {
    await Url.create({
      originalUrl: 'https://www.apple.com/tw/',
      shortUrl: 'A6M3G',
    })
  })

  context('POST /urls', () => {

    it(' - error', async () => {
      const res = await request(app)
        .post('/api/urls')
        .set({ 'Content-Type': 'application/json' })
        .send({ originalUrl: testData.invalidUrl })
        .expect(400)

      assert.strictEqual(res.body.message, 'invalid url')
    })

    it(' - successfully', async () => {
      const res = await request(app)
        .post('/api/urls')
        .set({ 'Content-Type': 'application/json' })
        .send({ originalUrl: testData.uniqueUrl })
        .expect(200)

      assert.strictEqual(res.body.data.originalUrl, testData.uniqueUrl)
    })
  })
  
  context('GET /:urls', () => {
    it(' - successfully', async () => {
      const res = await request(app)
        .get(`/api/A6M3G`)
        .set({ 'Content-Type': 'application/json' })
        .expect(200)

      assert.strictEqual(res.body.data.shortUrl, testData.shortUrl)
    })
  })

  after(async () => {
    await Url.deleteOne({ originalUrl: testData.uniqueUrl })
    await Url.deleteOne({ shortUrl: testData.shortUrl })
  })
})