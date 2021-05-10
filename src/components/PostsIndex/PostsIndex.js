import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { movieIndex } from '../../api/movies'

import Spinner from 'react-bootstrap/Spinner'

class MovieIndex extends Component {
  constructor (props) {
    // this is a best practice
    // this sets `this.props` in the constructor
    super(props)

    // keep track of all the movies we want to show, they will initially be null
    this.state = {
      movies: null
    }
  }

  // do this whenever MovieIndex is first shown on the page (mounted)
  componentDidMount () {
    const { user, msgAlert } = this.props

    // fetch all of the movies
    movieIndex(user)
      // set the movies state, to be the movies we got back from the response's data
      .then(res => this.setState({ movies: res.data.movies }))
      .then(() => msgAlert({
        heading: 'Successfully Got All Movies',
        message: 'Movies are now being shown.',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed To Get All Movies',
        message: 'Couldnt Get Movies Due to Error: ' + error.message,
        variant: 'failure'
      }))
  }

  render () {
    const { movies } = this.state

    // if we haven't loaded any movies
    if (!movies) {
      // show a loading spinner
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // turn each movie into a link to that movie
    const moviesJsx = movies.map(movie => (
      <Link to={`/movies/${movie._id}`} key={movie._id}>
        <li>
          {movie.title} by {movie.director}
        </li>
      </Link>
    ))

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Movies</h3>
          <ul>
            {moviesJsx}
          </ul>
        </div>
      </div>
    )
  }
}

export default MovieIndex
