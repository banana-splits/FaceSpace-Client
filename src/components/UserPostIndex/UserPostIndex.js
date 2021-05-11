import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter } from 'react-router-dom'
import { userPostShow } from '../../api/posts'
import PostShow from '../PostShow/PostShow'

let id

class UserPostIndex extends Component {
  constructor (props) {
    super(props)
    // initially our post state will be null, until it is fetched from the api
    this.state = {
      posts: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    if (match.params.id) {
      id = match.params.id
    } else {
      id = this.props.id
    }
    // make a request for a single post
    // console.log('postshow mount', match.params, user)
    userPostShow(id, user)
      // set the post state, to the post we got back in the response's data
      .then(res => this.setState({ posts: res.data.posts }))
      .then(() => msgAlert({
        heading: 'Showing post Successfully',
        message: 'The post is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing post Failed',
          message: 'Failed to show post with error: ' + error.message,
          variant: 'danger'
        })
      })
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
    console.log(posts)
    const postsJsx = posts.map((post) => (
      <li key={post._id}>
        <PostShow key={post._id} user={user} id={post._id} msgAlert={msgAlert}>
          {posts}
        </PostShow>
      </li>
    ))

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h2>Users Post</h2>
          {postsJsx}
        </div>
      </div>
    )
  }
}
export default withRouter(UserPostIndex)
