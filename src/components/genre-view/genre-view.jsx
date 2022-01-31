import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const GenreView = ({ genre, onBackClick }) => {
  return (
    <Row>
      <Col>
        <div className="genre-name">
          <span className="label">Genre: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <br />
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
        <br />
        <Link to={`/`}>
          <Button variant="primary" onClick={() => { onBackClick(null) }}>Go back to movie details</Button>
        </Link>
      </Col>
    </Row>
  );
}

GenreView.propTypes = {
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

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, null)(GenreView);