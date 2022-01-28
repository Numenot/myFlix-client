import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Button, Col, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.addFavMovie = this.addFavMovie.bind(this);
    this.onRemoveFavorite = this.onRemoveFavorite.bind(this);
    this.state = {
      FavoriteMovies: [],
      userDetails: []
    }
  }

  //Get user details to check for user's favorite movies
  getUserDetails() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.get(`https://myflixmovieapp-myflix.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        userDetails: response.data,
        FavoriteMovies: response.data.FavoriteMovies
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  //Add movie to favorite movie list
  addFavMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.post(`https://myflixmovieapp-myflix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
      .then(response => {
        console.log(response)
        window.open(`/movies/${this.props.movie._id}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Remove favorite movie from favorite list
  onRemoveFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`https://myflixmovieapp-myflix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(response => {
        console.log(response);
        window.open(`/movies/${this.props.movie._id}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    //Get full array of user's favorite movies
    let FavArray = this.state.FavoriteMovies;
    //Define the isFavoriteMovie variable which will determine which button appears on view (add to favorites or remove from favorites)
    let isFavoriteMovie = false
    //Check the favorite movies array to see if it includes the current movie and change isFavoriteMovie variable accordingly
    if (FavArray.includes(this.props.movie._id)) {
      isFavoriteMovie = true;
    } else {
      isFavoriteMovie = false;
    };

    return (
      <Container className="container-movie-view">
        <Row className="mb-2">
          <Col>
            <Image className="poster mb-2" crossOrigin="anonymous" src={movie.ImagePath} />
          </Col>
          <Col className="my-auto">
            <span className="movie-title"> {movie.Title} </span>
            <br />
            <br />
            <span className="label">Genre: </span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button size="md" variant="link" className="value"> {movie.Genre.Name} </Button>
            </Link>
            <br />
            <br />
            <span className="label">Director: </span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button size="md" variant="link" className="value"> {movie.Director.Name} </Button>
            </Link>
            <br />
            <br />
            <div className="movie-description">
              <span className="label">Description:</span>
              <span className="value"> {movie.Description}</span>
            </div>
            <br />
            {/* The button displayed depends on the isFavoriteMovie variable*/}
            {isFavoriteMovie ? (
              <Button variant="primary" onClick={this.onRemoveFavorite}> Remove from Favorites </Button>
            ) : (
              <Button variant="primary" onClick={this.addFavMovie}> Add to Favorites </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
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