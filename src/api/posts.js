import apiUrl from '../apiConfig'

import axios from 'axios'

export const postIndex = user => {
  return axios({
    url: apiUrl + '/posts',
    method: 'GET',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const postCreate = (post, user) => {
  return axios({
    url: apiUrl + '/posts',
    method: 'POST',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    },
    // send the post object as our data for creating a post
    data: { post }
  })
}

// get a single post
export const postShow = (id, user) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'GET',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const postDelete = (id, user) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'DELETE',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const postUpdate = (id, post, user) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { post }
  })
}

export const userPostsIndex = (id, user) => {
  return axios({
    url: apiUrl + '/users/' + id,
    method: 'GET',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}
