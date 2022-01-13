import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Container, Navbar, Nav, Col } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div className="main-view">
      <Navbar collapseOnSelect expand="lg" className="navbar-dark">
        <Navbar.Brand className="navbar-links" href="#home">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
          <Nav>
            <Nav.Link className="navbar-links" href="#Home">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="navbar-links" href="#register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="container-login-form">
        <Form>
          <Form.Group controlId="formUsername" className="mb-3 mt-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button className="mb-3" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Container>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};