import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="container-movie-view">
        <div className="movie-view">
          <div className="movie-poster">
            <img crossOrigin="anonymous" src={movie.ImagePath} />
          </div>
          <div className="movie-details">
            <div className="movie-title">
              <span className="label">Title:</span>
              <span className="value"> {movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description:</span>
              <span className="value"> {movie.Description}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre:</span>
              <span className="value"> {movie.Genre.Name}</span>
            </div>
            <div className="movie-director">
              <span className="label">Director:</span>
              <span className="value"> {movie.Director.Name}</span>
            </div>
          </div>
          <button onClick={() => { onBackClick(null); }}> Back </button>
        </div>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Featured: PropTypes.bool,
    Actors: PropTypes.array,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};