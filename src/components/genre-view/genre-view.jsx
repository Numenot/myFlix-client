import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function GenreView({ genre, onBackClick }) {
  return (
    <div>
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
    </div>
  );
}