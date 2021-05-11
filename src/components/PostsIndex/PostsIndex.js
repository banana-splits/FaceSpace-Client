import './PostsIndex.scss'

import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import { postIndex } from '../../api/posts.js'

import PostShow from '../PostShow/PostShow.js'

import Spinner from 'react-bootstrap/Spinner'

class PostIndex extends Component {
  constructor (props) {
    // this is a best practice
    // this sets `this.props` in the constructor
    super(props)

    // keep track of all the posts we want to show, they will initially be null
    this.state = {
      posts: null
    }
  }

  // do this whenever PostIndex is first shown on the page (mounted)
  componentDidMount () {
    const { user, msgAlert } = this.props

    // fetch all of the posts
    postIndex(user)
      // set the posts state, to be the posts we got back from the response's data
      .then(res => this.setState({ posts: res.data.posts }))
      .then(() => msgAlert({
        heading: 'Successfully Got All Posts',
        message: 'Posts are now being shown.',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed To Get All Posts',
        message: 'Couldnt Get Posts Due to Error: ' + error.message,
        variant: 'failure'
      }))
  }

  render () {
    const { posts } = this.state
    const { user, msgAlert } = this.props

    // if we haven't loaded any posts
    if (!posts) {
      // show a loading spinner
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // turn each post into a link to that post
    const postsJsx = posts.map(post => (
      <div key={post._id} className="pl-4 post-div">
        <PostShow key={post._id} user={user} id={post._id} msgAlert={msgAlert}>
        </PostShow>
      </div>
    ))

    return (
      <div className="row">
        <div className="col-sm-12 col-md-10 mx-auto mt-5 px-4 posts-list">
          <h2>All Posts</h2>
          {postsJsx}
        </div>
      </div>
    )
  }
}

export default withRouter(PostIndex)
