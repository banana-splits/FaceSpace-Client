import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import { userPostsIndex } from '../../api/posts.js'

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
    const { user, msgAlert, match } = this.props

    // fetch all of the posts
    userPostsIndex(match.params.userId, user)
      // set the posts state, to be the posts we got back from the response's data
      .then(res => this.setState({ posts: res.data.posts }))
      .then(() => msgAlert({
        heading: 'Successfully Got User\'s Posts',
        message: 'Posts are now being shown.',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed To Get User\'s Posts',
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
    // console.log('posts', posts)
    const postsJsx = posts.map(post => (
      <div key={post._id} className="posts">
        <PostShow key={post._id} user={user} id={post._id} msgAlert={msgAlert}>
        </PostShow>
      </div>
    ))

    return (
      <div className="box">
        <h2 className="title">User&apos;s Posts</h2>
        {postsJsx}
      </div>
    )
  }
}

export default withRouter(PostIndex)
