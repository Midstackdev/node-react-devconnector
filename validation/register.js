const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegistration(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : ''

  if(!Validator.isLength(data.name, { min: 6, max: 30 })) {
    errors.name = 'Name must be between 6 and 30 characters'
  }
  
  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }
  
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }
  
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }
  
  if(!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 characters'
  }
  
  if (Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = 'Confirm password field is required'
  }
  
  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = 'Passwords do no match.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}