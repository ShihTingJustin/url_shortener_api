const Url = require('../../models/url')
const assert = require('assert')
const request = require('supertest')
const app = require('../../app')
const testData = {
  originalUrl: 'https://www.apple.com/tw/',
  shortUrl: 'A6M3G'
}

describe('api test', () => {
  describe('POST /api/urls', () => {
    before(done => {
      Url.deleteOne({}, done)
    })

    it(' - successfully', async () => {
      const res = await request(app)
        .post('/api/urls')
        .set({ 'Content-Type': 'application/json' })
        .send({ originalUrl: testData.originalUrl })
        .expect(200)

      assert.strictEqual(res.body.data.originalUrl, testData.originalUrl)
    })

    after(done => {
      Url.deleteOne({}, done)
    })
  })
})