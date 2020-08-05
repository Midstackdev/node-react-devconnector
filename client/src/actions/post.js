import axios from 'axios'
import {
  ADD_POST,
  GET_POSTS,
  GET_ERRORS,
  POST_LOADING,
  DELETE_POST
} from './types'

export const addPost = postData => dispatch => {
  axios.post(`/api/posts`, postData)
    .then(response =>
      dispatch({
        type: ADD_POST,
        payload: response.data.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      })
    )
}

export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  
  axios.get(`/api/posts`)
    .then(response =>
      dispatch({
        type: GET_POSTS,
        payload: response.data.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_POSTS,
        payload: {}
      })
    )
}

export const deletePost = id => dispatch => {
  axios.delete(`/api/posts/${id}`)
    .then(response =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}

export const addLike = id => dispatch => {
  axios.post(`/api/posts/like/${id}`)
    .then(response =>
      dispatch(getPosts())
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}

export const removeLike = id => dispatch => {
  axios.post(`/api/posts/unlike/${id}`)
    .then(response =>
      dispatch(getPosts())
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}