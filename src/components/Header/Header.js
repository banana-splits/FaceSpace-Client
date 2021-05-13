import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import Container from 'react-bootstrap/Container'
import faceSpace from '../../images/facespace-logo.png'
import backGround from '../../images/GA-Mates.jpeg'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className='link-front' href="#create">Create Post</Nav.Link>
    <Nav.Link className='link-front' href="#users">View Users</Nav.Link>
    <Nav.Link className='link-front' href="#change-password">Change Password</Nav.Link>
    <Nav.Link className='link-front' href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className='link-front' href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className='link-front' href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link className='link-front' href="#home">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <div>
    <Navbar bg="primary" variant="dark" expand="md" className="navbar">
      <Navbar.Brand href="#" className="nav-heading">
        <img src={faceSpace} className="img-responsive logo"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user && <span className="navbar-text link-front mr-2">Welcome, {user.email}</span>}
          { alwaysOptions }
          { user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div>
      <div className="background">
        <img src={backGround} className="img"/>
      </div>
    </div>
  </div>
)

export default Header
