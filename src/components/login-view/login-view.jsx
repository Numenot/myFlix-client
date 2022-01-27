import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://myflixmovieapp-myflix.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (
    <Container className="container-login-form">
      <Form>
        <Form.Group controlId="formUsername" className="mb-3 mt-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
          {usernameErr && <p>{usernameErr}</p>}
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Button className="mb-3" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};