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
const domain = 'https://url-shortener-api-server.herokuapp.com/'

describe('api test', () => {
  context('POST /api/urls', () => {
    it(' - error', async () => {
      const res = await request(app)
        .post('/api/urls')
        .set({ 'Content-Type': 'application/json' })
        .send({ originalUrl: testData.originalUrl })
        .expect(400)

      assert.strictEqual(res.body.message, 'original url is existed')
    })

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

  context('GET /api/:urls', () => {
    it(' - successfully', async () => {
      const data = await Url.findOne({ originalUrl: testData.originalUrl })
      const { shortUrl } = data
      const res = await request(app)
        .get(`/api/${shortUrl}`)
        .set({ 'Content-Type': 'application/json' })
        .expect(200)

      assert.strictEqual(res.body.data.shortUrl, domain + shortUrl)
    })
  })

  after((done) => {
    Url.deleteOne({ originalUrl: testData.uniqueUrl}, done)
  })
})