import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

// bootstrap imports
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { commentCreate } from '../../api/comments'

class CommentCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // start our comment state empty
      comment: '',
      // createdId will be null until a comment is created
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert, postId } = this.props
    const { comment } = this.state
    console.log(`props is, ${this.props}`)

    // create a comment, pass it the comment data and the user for its token
    commentCreate(comment, user, postId)
      // set the createdId to the id of the comment we just created
      // .then(res => this.setState({ createdId: res.data.comment._id }))
      .then(res => {
        this.setState({ createdId: res.data.comment._id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Comment Successfully',
        message: 'Comment has been created successfully. Now viewing comment.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Comment',
          message: 'Could not create comment with error: ' + error.message,
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
      // set the comment state, to what it used to be (...state.comment)
      // but replace the property with `name` to its current `value`
      // ex. name could be `title` or `director`
      comment: { ...state.comment, [event.target.name]: event.target.value }
    }
  })
}

render () {
  // if we created the comment successfully
  // then we'll redirect to the new comment
  if (this.state.createdId) {
    return <Redirect to='/posts' />
  }
  return (
    <div>
      <div className="col-sm-5 col-md-5 mx-auto">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="input" className='comment-form'>
            <Form.Control
              name="text"
              value={this.state.comment.text}
              placeholder="Comment here"
              onChange={this.handleChange}
            />
            <Button
              size="sm"
              variant="primary"
              type="submit"
            >  Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}
}

export default CommentCreate
