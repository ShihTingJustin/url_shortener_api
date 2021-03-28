const User = require('../models/user')
const helpers = require('../helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
  },

  signIn: async (req, res) => {
    try {
      // 檢查必要資料
      const email = req.body.email
      const password = req.body.password
      if (!req.body.email || !req.body.password) throw new Error

      // check user exist
      const user = await User.findOne({ email })
      if (!user) return res.status(401).json({ status: 'error', message: 'no such user found' })
      // check password
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ status: 'error', message: 'passwords did not match' })
      }
      // token-signing
      const payload = { id: user._id }
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      return res.status(200).json({
        status: 'success',
        message: 'ok',
        token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(401).json({ status: 'error', message: 'required fields did not exist' })
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      return res.json(await User.findById(`${req.user.id}`))
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = userController