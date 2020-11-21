const Url = require('../../models/url')
const assert = require('assert')
const request = require('supertest')
const app = require('../../app')
const testData = {
  originalUrl: 'https://www.apple.com/tw/',
  shortUrl: 'A6M3G'
}

describe('api test', () => {
  context('POST /api/urls', () => {
    it(' - successfully', async () => {
      const res = await request(app)
        .post('/api/urls')
        .set({ 'Content-Type': 'application/json' })
        .send({ originalUrl: testData.originalUrl })
        .expect(200)

      assert.strictEqual(res.body.data.originalUrl, testData.originalUrl)
    })
  })

  context('GET /api/:urls', () => {
    it(' - successfully', async () => {
      const data = await Url.findOne({ originalUrl: testData.originalUrl })
      const { shortUrl } = data
      const res = await request(app)
        .get(`/api/${shortUrl}`)
        .set({ 'Content-Type': 'application/json' })
        .expect(200)

      assert.strictEqual(res.body.data.shortUrl, shortUrl)
    })

    after((done) => {
      Url.deleteOne({}, done)
    })
  })
})