import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Button, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import './movie-view.scss';

export class MovieView extends React.Component {

  addFavMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://myflixmovieapp-myflix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
      .then(response => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          <Col className="movie-genre mb-1" md={{ span: 3, offset: 3 }}>
            <span className="label">Genre: </span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button size="md" variant="link" className="value"> {movie.Genre.Name} </Button>
            </Link>
          </Col>
          <Col className="movie-director" md={3}>
            <span className="label">Director: </span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button size="md" variant="link" className="value"> {movie.Director.Name} </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="movie-description" md={{ span: 6, offset: 3 }}>
            <span className="label">Description:</span>
            <span className="value"> {movie.Description}</span>
          </Col>
        </Row>
        <Row>
          <Col className="mb-1" md={{ span: 2, offset: 4 }}>
            <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
          {/* Upon click on the add to favorites button, the movie will be added to favorite list and a tooltip will appear under the button to confirm to the user it was added. */}
          <Col md={2}>
            <OverlayTrigger key="bottom" placement="bottom" trigger="click" overlay={
              <Tooltip id="tooltip-right">
                Added to your favorites!
              </Tooltip>
            }>
              <Button variant="secondary" value={movie._id} onClick={(e) => this.addFavMovie(e, movie)}>Add to Favorites</Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Container >
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