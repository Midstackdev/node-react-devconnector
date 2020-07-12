const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Post = require('../../models/Post')

const validatePostInput = require('../../validation/post')

// @route   GET api/post/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: 'Post works'
}))

// @route   GET api/posts
// @desc    Get all post
// @access  Public
router.get('/', (req, res) => {
  Post.find({})
    .sort({ createdAt: -1 })
    .then(posts => res.json({ data: posts }))
    .catch(err => res.status(404).json({
      errors: {
        message: 'Posts not found.',
        mongo: err
      }
    }))
})

// @route   GET api/posts/:id
// @desc    Get all post
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json({ data: posts }))
    .catch(err => res.status(404).json({
      errors: {
        message: 'Post not found.',
        mongo: err
      }
    }))
})

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  if(!isValid) {
    return res.status(400).json({errors})
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id,
  })

  newPost.save().then(post => res.json({data: post}))
})

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(401).json({ msg: 'Already liked post' })
      }
      post.likes.unshift({ user: req.user.id })
      post.save().then(() => res.json({ success: true, data: post }))
    })
    .catch(err => res.status(404).json({
      errors: {
        message: 'Post not found.',
        mongo: err
      }
    }))
})

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(401).json({ msg: 'You have not liked post' })
      }

      const likes = post.likes.filter(item => item.user.toString() !== req.user.id)
      post.likes.splice(0, post.likes.length, ...likes)
      post.save().then(() => res.json({ success: true, data: post }))
    })
    .catch(err => res.status(404).json({
      errors: {
        message: 'Post not found.',
        mongo: err
      }
    }))
})

// @route   POST api/posts/like/:id
// @desc    Comment post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  if(!isValid) {
    return res.status(400).json({errors})
  }

  Post.findById(req.params.id)
    .then(post => {
      const newcomment = {
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id,
      }

      post.comments.unshift(newcomment)
      post.save().then(() => res.json({ success: true, data: post }))
    })
    .catch(err => res.status(404).json({
      errors: {
        message: 'Post not found.',
        mongo: err
      }
    }))
})

// @route   POST api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.post('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length > 0) {
        return res.status(404).json({
          msg: 'Comment does not exist'
        })
      }

      const comments = post.comments.filter(item => item._id.toString() !== req.params.comment_id)
      post.comments.splice(0, post.comments.length, ...comments)
      post.save().then(() => res.json({ success: true, data: post }))
    })
    .catch(err => res.status(404).json({
      errors: {
        message: 'Post not found.',
        mongo: err
      }
    }))
})

// @route   DELETE api/posts/:id
// @desc    Delete all post
// @access  Public
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Unautorized action' })
      }
      post.remove().then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({
      errors: {
        message: 'Post not found.',
        mongo: err
      }
    }))
})

module.exports = router