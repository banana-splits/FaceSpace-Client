import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { postShow, postDelete } from '../../api/posts'

let id

class PostShow extends Component {
  constructor (props) {
    super(props)

    // initially our post state will be null, until it is fetched from the api
    this.state = {
      post: null,
      deleted: false
    }
  }

  componentDidMount () {
    // console.log('props', this.props)
    const { user, match, msgAlert } = this.props

    if (match.params.postId) {
      id = match.params.postId
    } else {
      id = this.props.id
    }

    // make a request for a single post
    // console.log('postshow mount', match.params, user)
    postShow(id, user)
      // set the post state, to the post we got back in the response's data
      .then(res => this.setState({ post: res.data.post }))
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

  handleDelete = event => {
    const { user, msgAlert } = this.props

    // make a delete axios request
    postDelete(id, user)
      // set the deleted variable to true, to redirect to the posts page in render
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted post Successfully!',
        message: 'post deleted!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Deleting post Failed',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { post, deleted } = this.state

    // if we don't have a post yet
    if (!post) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the post is deleted
    if (deleted) {
      // redirect to the posts index page
      return <Redirect to="/posts" />
    }

    return (
      <div>
        <h3>{post.text}</h3>
        <button onClick={this.handleDelete}>Delete post</button>
        <button>
          <Link to={`/posts/${post._id}/update`}>Edit post</Link>
        </button>
      </div>
    )
  }
}

export default withRouter(PostShow)
