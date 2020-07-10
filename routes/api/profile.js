const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Profile model
const Profile = require('../../models/Profile') 
// Load User model
const User = require('../../models/User') 

const validateProfileInput = require('../../validation/profile')

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: 'Profile works'
}))

// @route   GET api/profile
// @desc    Get current user profile route
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noProfile = 'There is no profile for this user'
        return res.status(404).json({errors})
      }
      res.json({ data: profile })
    })
    .catch(err => res.status(404).json(err))
})

// @route   POST api/profile
// @desc    Create or Edit user profile route
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  if(!isValid) {
    return res.status(400).json({errors})
  }
  
  const profileFields = {}
  profileFields.user = req.user.id
  req.body.handle ? profileFields.handle = req.body.handle : ''
  req.body.company ? profileFields.company = req.body.company : ''
  req.body.website ? profileFields.website = req.body.website : ''
  req.body.location ? profileFields.location = req.body.location : ''
  req.body.bio ? profileFields.bio = req.body.bio : ''
  req.body.status ? profileFields.status = req.body.status : ''
  req.body.githubUsername ? profileFields.githubUsername = req.body.githubUsername : ''
  
  typeof req.body.skills !== 'undefined' ? profileFields.skills = req.body.skills.split(',') : ''
  
  profileFields.social = {}
  req.body.youtube ? profileFields.social.youtube = req.body.youtube : ''
  req.body.twitter ? profileFields.social.twitter = req.body.twitter : ''
  req.body.instagram ? profileFields.social.instagram = req.body.instagram : ''
  req.body.facebook ? profileFields.social.facebook = req.body.facebook : ''
  req.body.linkedIn ? profileFields.social.linkedIn = req.body.linkedIn : ''

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(profile) {
        //update
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(profile => res.json({data: profile}))
      }else {
        //create
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if(profile) {
              errors.handle = 'This handle already exists'
              res.status(400).json({errors})
            }

            new Profile(profileFields).save()
              .then(profile => res.json({ data: profile }))
          })
      }
    })
})

module.exports = router