import React, { Component } from 'react'

import { Redirect, withRouter } from 'react-router-dom'

import { postUpdate } from '../../api/posts'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'
// import Spinner from 'react-bootstrap/Spinner'

class PostUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // start our post state empty
      post: '',
      // createdId will be null until a post is created
      updatedId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert, match } = this.props
    const { post } = this.state

    // create a post, pass it the post data and the user for its token
    postUpdate(match.params.id, post, user)
      // set the createdId to the id of the post we just created
      // .then(res => this.setState({ createdId: res.data.post._id }))
      .then(res => {
        this.setState({ updatedId: match.params.id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Edited Post Successfully',
        message: 'Post has been edited successfully. Now viewing post.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to edit Post',
          message: 'Could not edit post with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

// when an input changes, update the state that corresponds with the input's name
handleChange = event => {
  // in react, an event is actually a SyntheticEvent
  // to ensure the properties are not set to null after handleChange is finished
  // we must call event.persist
  event.persist()

  this.setState(state => {
    // return our state changge
    return {
      // set the post state, to what it used to be (...state.post)
      // but replace the property with `name` to its current `value`
      // ex. name could be `title` or `director`
      post: { ...state.post, [event.target.name]: event.target.value }
    }
  })
}

render () {
  // if we created the post successfully
  // then we'll redirect to the new post
  if (this.state.updatedId) {
    return <Redirect to='/home' />
  }
  return (
    <div className="editbox">
      <div className="col-sm-10 col-md-8 mx-auto mt-5 editDiv">
        <h3>Edit Post</h3>
        <Form onSubmit={this.handleSubmit}>
          <div className='editInnerDiv'>
            <Form.Group controlId="input">
              <Form.Control
                name="text"
                value={this.state.post.text}
                placeholder="Enter post here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="uptbtn"
            >  Edit Post
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
}

export default withRouter(PostUpdate)
