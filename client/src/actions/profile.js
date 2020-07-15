import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE
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