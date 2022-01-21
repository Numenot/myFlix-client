import React from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export function DirectorView({ movie, onBackClick }) {
  return (
    <div className='director-view'>
      <h1> {movie.Director.Name}</h1>
      {movie.Director.Bio}
      Birth Year: {movie.Director.Birth}
      <Button variant="primary" onClick={() => onBackClick()}>Back</Button>
    </div>
  )
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
    }).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}