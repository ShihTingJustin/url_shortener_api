const User = require('../models/user')
const helpers = require('../helpers')
const bcrypt = require('bcryptjs')

const userController = {
  createUser: async (req, res) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      if (!name || !email || !password || !passwordCheck) throw new Error
      if (password !== passwordCheck) throw new Error

      // user is duplicated
      const result = await helpers.isUnique(User, 'email', email)
      if (result === 'duplicated') throw new Error

      // user is unique
      if (result === 'unique') {
        await User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
        })
        return res.status(200).json({ status: '200', message: 'user create successfully' })
      }
    } catch (err) {
      return res.status(403).json({ status: '403', message: 'user info invalid' })
    }
  }
}

module.exports = userController