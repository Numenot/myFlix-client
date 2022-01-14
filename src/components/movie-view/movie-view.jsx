import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Button, Col, Image } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="container-movie-view">
        <Row className="movie-poster">
          <Col>
            <Image className="poster" crossOrigin="anonymous" src={movie.ImagePath} />
          </Col>
        </Row>
        <Row>
          <Col className="movie-title">{movie.Title}</Col>
        </Row>
        <Row>
          <Col className="movie-genre" md={{ span: 3, offset: 3 }}>
            <span className="label">Genre:</span>
            <span className="value"> {movie.Genre.Name}</span>
          </Col>
          <Col className="movie-director" md={3}>
            <span className="label">Director:</span>
            <span className="value"> {movie.Director.Name}</span>
          </Col>
        </Row>
        <Row>
          <Col className="movie-description" md={{ span: 6, offset: 3 }}>
            <span className="label">Description:</span>
            <span className="value"> {movie.Description}</span>
          </Col>
        </Row>
        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
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