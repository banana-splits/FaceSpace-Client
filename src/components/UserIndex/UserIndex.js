import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { indexUsers } from '../../api/users'

import Spinner from 'react-bootstrap/Spinner'

class UserIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    indexUsers(user)
      .then(res => this.setState({ users: res.data.users }))
      .then(() => msgAlert({
        heading: 'Successfully Got All Users',
        message: 'Users are now being shown.',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed To Get All Users',
        message: 'Couldnt Get Users Due to Error: ' + error.message,
        variant: 'failure'
      }))
  }

  render () {
    const { users } = this.state

    if (!users) {
      // show a loading spinner
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const usersJsx = users.map(user => (
      <Link to={`/users/${user._id}`} key={user._id}>
        <li>
          {user.email}
        </li>
      </Link>
    ))
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Users</h3>
          <ul>
            {usersJsx}
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(UserIndex)
