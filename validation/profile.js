const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.status = !isEmpty(data.status) ? data.status : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''

  if(!Validator.isLength(data.handle, { min: 4, max: 8 })) {
    errors.handle = 'Handle must be between 4 and 8 characters'
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required'
  }
  
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required'
  }
  
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required'
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid Url.'
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid Url.'
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid Url.'
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid Url.'
    }
  }

  if (!isEmpty(data.linkedIn)) {
    if (!Validator.isURL(data.linkedIn)) {
      errors.linkedIn = 'Not a valid Url.'
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid Url.'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}