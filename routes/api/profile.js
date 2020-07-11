const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Profile model
const Profile = require('../../models/Profile') 
// Load User model
const User = require('../../models/User') 

const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

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

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {}
  
  Profile.find({})
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if(!profiles) {
        errors.noProfiles = 'There are no profiles'
        return res.status(404).json({errors})
      }
      res.json({ data: profiles })
    })
    .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/handle/:handle
// @desc    Get user profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  
  Profile.findOne({ handle: req.params.handle })
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


// @route   GET api/profile/user/:user_id
// @desc    Get user profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {}
  
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noProfile = 'There is no profile for this user'
        return res.status(404).json({errors})
      }
      res.json({ data: profile })
    })
    .catch(err => res.status(404).json({
      errors: {
        message: 'Profile does not exist',
        mongo: err
      }
    }))
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

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body)

  if(!isValid) {
    return res.status(400).json({errors})
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }

      //Add to experience array
      profile.experience.unshift(newExp)
      profile.save().then(profile => res.json({data: profile}))
    })
})

// @route   DELETE api/profile/experience
// @desc    Delete experience to profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeExp = profile.experience.filter(item => item.id !== req.params.exp_id)
        
      profile.experience.splice(0, profile.experience.length, ...removeExp)

      profile.save().then(profile => res.json({data: profile}))
    })
    .catch(err => res.status(404).json({
      errors: {
        message: 'Profile experience does not exist',
        mongo: err
      }
    }))
})

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body)

  if(!isValid) {
    return res.status(400).json({errors})
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }

      //Add to experience array
      profile.education.unshift(newEdu)
      profile.save().then(profile => res.json({data: profile}))
    })
})

// @route   DELETE api/profile/education
// @desc    Delete education to profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeEdu = profile.education.filter(item => item.id !== req.params.edu_id)
        
      profile.education.splice(0, profile.education.length, ...removeEdu)

      profile.save().then(profile => res.json({data: profile}))
    })
    .catch(err => res.status(404).json({
      errors: {
        message: 'Profile experience does not exist',
        mongo: err
      }
    }))
})

// @route   DELETE api/profile/education
// @desc    Delete education to profile
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => {
          res.json({ success: true })
        })
        .catch(err => res.status(404).json({
          errors: {
            message: 'User deleted done.',
            mongo: err
          }
        }))
    })
    .catch(err => res.status(404).json({
      errors: {
        message: 'Profile deleted done.',
        mongo: err
      }
    }))
})



module.exports = router