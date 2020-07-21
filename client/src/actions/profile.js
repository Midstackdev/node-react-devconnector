import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_AUTH_USER
} from './types'
import axios from 'axios'

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get(`/api/profile`)
    .then(response => 
        dispatch({
          type: GET_PROFILE,
          payload: response.data.data
        })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      }) 
    )
}

export const createProfile = (profileData, history) => dispatch => {
  axios.post(`/api/profile`, profileData)
    .then(response => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      })
    )
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure This cannot be undone!')) {
    axios.delete(`/api/profile`)
      .then(response => 
        dispatch({
          type: SET_AUTH_USER,
          payload: {}
        })  
      )
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.errors
        })
      )
  }
}

export const addExperience = (payload, history) => dispatch => {
  axios.post(`/api/profile/experience`, payload)
    .then(response => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      })  
    )
}

export const addEducation = (payload, history) => dispatch => {
  axios.post(`/api/profile/education`, payload)
    .then(response => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      })  
    )
}