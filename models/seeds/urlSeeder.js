const Url = require('../url')
const db = require('../../config/mongoose')
const seedData = require('./seed.json')

const records = seedData.map(item => JSON.parse(JSON.stringify(item)))

db.once('open', async () => {
  console.log('run seeder...')
  await Url.create(...records)
  console.log('seeder complete!')
  process.exit()
})