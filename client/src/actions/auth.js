import {
  GET_ERRORS,
  SET_AUTH_USER
} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwtDecode from 'jwt-decode'

//Register user
export const registerUser = (userData, history) => dispatch => {
  axios.post(`/api/users/register`, userData)
   .then(response => history.push('/login'))
   .catch(error => 
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      })
    )
}

//Login user
export const loginUser = (userData) => dispatch => {
  axios.post(`/api/users/login`, userData)
    .then(response => {
      //save to localStorage
      const token = response.data.token
      console.log(token)
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      //Decode token for user data
      const decoded = jwtDecode(token)
      //set auth user
      dispatch(setAuthUser(decoded))
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      })
    )
}

//set Auth user
export const setAuthUser = (decoded) => {
  return {
    type: SET_AUTH_USER,
    payload: decoded
  }
}

//Logout user
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')

  setAuthToken(false)

  dispatch(setAuthUser({}))
}