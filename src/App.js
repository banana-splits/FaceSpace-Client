import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import PostCreate from './components/PostCreate/PostCreate'
import PostShow from './components/PostShow/PostShow'
import PostsIndex from './components/PostsIndex/PostsIndex'
import PostUpdate from './components/PostUpdate/PostUpdate'
import UserIndex from './components/UserIndex/UserIndex'
import UserPostsIndex from './components/UserPostsIndex/UserPostsIndex'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create' render={() => (
            <PostCreate msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Get a single post | show */}
          <AuthenticatedRoute user={user} exact path='/posts/:postId' render={() => (
            <PostShow msgAlert={this.msgAlert} user={user} />
          )} />

          {/* View All posts | postIndex */}
          <AuthenticatedRoute user={user} exact path='/home' render={() => (
            <PostsIndex msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Update single post | postUpdate */}
          <AuthenticatedRoute user={user} exact path='/posts/:id/update' render={() => (
            <PostUpdate msgAlert={this.msgAlert} user={user} />
          )} />

          {/* View all users | userIndex */}
          <AuthenticatedRoute user={user} exact path='/users' render={() => (
            <UserIndex msgAlert={this.msgAlert} user={user} />
          )} />

          {/* View single users all post | userPostIndex */}
          <AuthenticatedRoute user={user} exact path='/users/:userId' render={() => (
            <UserPostsIndex msgAlert={this.msgAlert} user={user} />
          )} />

        </main>
      </Fragment>
    )
  }
}

export default App
