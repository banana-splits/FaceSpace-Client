import apiUrl from '../apiConfig'

import axios from 'axios'

export const commentCreate = (comment, user, id) => {
  return axios({
    url: `${apiUrl}/posts/${id}/comments`,
    method: 'POST',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    },
    // send the comment object as our data for creating a comment
    data: { comment }
  })
}
