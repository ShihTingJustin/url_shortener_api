const passport = require('passport')
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const { ExtractJwt } = passportJWT
const JwtStrategy = passportJWT.Strategy
const User = require('../models/user')
require('dotenv').config()

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  User.findById(jwt_payload.id).then(user => {
    if (!user) return next(null, false)
    return next(null, user)
  })
}))

module.exports = passport