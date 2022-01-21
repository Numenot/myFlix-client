import React from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export function GenreView({ movie, onBackClick }) {
  return (
    <div className='genre-view'>
      <h1> {movie.Genre.Name}</h1>
      {movie.Genre.Description}
      <Button variant="primary" onClick={() => onBackClick()}>Back</Button>
    </div>
  )
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}