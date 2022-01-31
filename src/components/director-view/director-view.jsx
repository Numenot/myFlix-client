import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DirectorView = ({ director, onBackClick }) => {
  return (
    <Row>
      <Col>
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <br />
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <br />
        <Link to={`/`}>
          <Button variant="primary" onClick={() => { onBackClick(null) }}>Go back to movie details</Button>
        </Link>
      </Col>
    </Row>
  );
}

DirectorView.propTypes = {
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

export default connect(mapStateToProps, null)(DirectorView);