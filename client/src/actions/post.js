import axios from 'axios'
import {
  ADD_POST,
  GET_POSTS,
  GET_ERRORS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from './types'

export const addPost = postData => dispatch => {
  dispatch(clearErrors())
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


export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors())
  axios.post(`/api/posts/comment/${postId}`, commentData)
    .then(response =>
      dispatch({
        type: GET_POST,
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

export const deleteComment = (postId, commentId) => dispatch => {
  axios.post(`/api/posts/comment/${postId}/${commentId}`)
    .then(response =>
      dispatch({
        type: GET_POST,
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

export const getPost = (id) => dispatch => {
  dispatch(setPostLoading())
  
  axios.get(`/api/posts/${id}`)
    .then(response =>
      dispatch({
        type: GET_POST,
        payload: response.data.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_POST,
        payload: null
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

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}