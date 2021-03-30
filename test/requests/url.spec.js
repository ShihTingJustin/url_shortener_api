const Url = require('../../models/url')
const assert = require('assert')
const request = require('supertest')
const app = require('../../app.js')
const testData = {
  originalUrl: 'https://www.apple.com/tw/',
  shortUrl: 'A6M3G',
  uniqueUrl: 'https://www.google.com.tw/',
  invalidUrl: 'https://12489gsd8564w8eg'
}
require('dotenv').config()

describe('api test', () => {
  let token = ''
  before(async () => {
    await Url.create({
      originalUrl: 'https://www.apple.com/tw/',
      shortUrl: 'A6M3G',
    })

    const res = await request(app)
      .post('/api/signin')
      .set({ 'Content-Type': 'application/json' })
      .send({
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PW
      })
      .expect(200)

    return token = res.body.token
  })

  context('POST /urls', () => {

    it(' - error', async () => {
      const res = await request(app)
        .post('/api/urls')
        .set({
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        })
        .send({ originalUrl: testData.invalidUrl })
        .expect(400)

      assert.strictEqual(res.body.message, 'invalid url')
    })

    it(' - successfully', async () => {
      const res = await request(app)
        .post('/api/urls')
        .set({
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        })
        .send({ originalUrl: testData.uniqueUrl })
        .expect(200)

      assert.strictEqual(res.body.data.originalUrl, testData.uniqueUrl)
    })
  })

  context('GET /:urls', () => {
    it(' - successfully', async () => {
      const res = await request(app)
        .get(`/api/A6M3G`)
        .set({
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        })
        .expect(200)

      assert.strictEqual(res.body.data.shortUrl, testData.shortUrl)
    })
  })

  after(async () => {
    await Url.deleteOne({ originalUrl: testData.uniqueUrl })
    await Url.deleteOne({ shortUrl: testData.shortUrl })
  })
})