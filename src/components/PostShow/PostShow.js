import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { postShow, postDelete } from '../../api/posts'

class PostShow extends Component {
  constructor (props) {
    super(props)

    // initially our post state will be null, until it is fetched from the api
    this.state = {
      post: null,
      deleted: false,
      id: null
    }
  }

  show = () => {
    const { user } = this.props
    // make a request for a single post
    // console.log('postshow mount', match.params, user)
    postShow(this.state.id, user)
      // set the post state, to the post we got back in the response's data
      .then(res => this.setState({ post: res.data.post }))
  }

  componentDidMount () {
    // console.log('props', this.props)
    const { match } = this.props

    if (match.params.postId) {
      this.setState({ id: match.params.postId }, this.show)
    } else {
      this.setState({ id: this.props.id }, this.show)
    }
  }

  handleDelete = event => {
    // console.log('handleDelete')
    // console.log('props: ', this.props)
    // console.log('state: ', this.state)
    const { user, msgAlert } = this.props

    // make a delete axios request
    // console.log('deleting id: ', id)
    postDelete(this.state.id, user)
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
    // console.log('render')
    // console.log('props: ', this.props)
    // console.log('state: ', this.state)
    // console.log('id: ', id)
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
      return <Redirect to="/" />
    }

    return (
      <div>
        <h3>{post.ownerEmail}</h3>
        <p>{post.text}</p>
        <Button onClick={this.handleDelete}>Delete post</Button>
        <Button>
          <Link className="link" to={`/posts/${post._id}/update`}>Edit post</Link>
        </Button>
      </div>
    )
  }
}

export default withRouter(PostShow)
