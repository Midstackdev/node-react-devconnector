const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { tokenSecret } = require('../../config/config')
const passport = require('passport')

//Input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')

router.get('/test', (req, res) => res.json({
  msg: 'User works'
}))

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if(!isValid) {
    return res.status(400).json({errors})
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        errors.email = 'Email already exists.'
        return res.status(400).json({errors})
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }, true)
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => res.json({data: user}))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if(!isValid) {
    return res.status(400).json({errors})
  }

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email })
    .then(user => {
      if(!user) {
        errors.email = 'User not found'
        return res.status(404).json({ errors })
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const payload = { name: user.name, id: user._id, email: user.email, avatar: user.avatar }
            
            jwt.sign(payload, tokenSecret, { expiresIn: 3600 }, 
              (err, token) => {
                return res.json({
                  success: true,
                  data: payload,
                  token: `Bearer ${token}`
                })
            })
          } else {
            errors.password = "Password incorrect."
            return res.status(400).json({ errors });
          }
        })
    })
})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  const payload = {
    name: req.user.name,
    id: req.user._id,
    email: req.user.email,
    avatar: req.user.avatar
  }
  return res.json({ data: payload })
})

module.exports = router