import { GET_ERRORS } from './types'
import axios from 'axios'

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