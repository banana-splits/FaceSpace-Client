import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { indexUsers } from '../../api/users'

class UserIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexUsers(user)
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

export default withRouter(UserIndex)
