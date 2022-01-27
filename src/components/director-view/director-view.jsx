import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function DirectorView({ director, onBackClick }) {
  return (
    <div>
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
    </div>
  );
}