const Url = require('../url.js')
const User = require('../user.js')
const db = require('../../config/mongoose')
const urlSeederData = require('./urlSeed.json')
const userSeederData = require('./userSeed.json')

const recordData = urlSeederData.map(item => JSON.parse(JSON.stringify(item)))
const userData = userSeederData.map(item => JSON.parse(JSON.stringify(item)))

db.once('open', async () => {
  try {
    console.log('run seeder...')
    await User.create(...userData)
    const userId0 = (await User.findOne({ name: 'LH44' }).lean())._id
    const userId1 = (await User.findOne({ name: 'NR6' }).lean())._id
    const records = recordData.map((item, idx) => {
      if (idx % 2 === 0) item.userId = userId0
      else item.userId = userId1
      return item
    })
    await Url.create(...records)
    console.log('seeder complete!')
    process.exit()
  }
  catch (err) {
    console.log(err)
  }
})