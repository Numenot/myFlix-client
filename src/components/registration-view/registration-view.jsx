import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    } else if (username.length < 5) {
      setValues({ ...values, usernameErr: 'Username must be at least 5 characters long' })
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be atleast 6 characters long' })
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email Required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email is invalid' });
      isReq = false;
    } else if (email.indexOf('.') === -1) {
      setValues({ ...values, emailErr: 'Email is invalid' });
      isReq = false;
    }

    return isReq
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    /* Send a request to the server for validation*/
    if (isReq) {
      axios.post('https://myflixmovieapp-myflix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration succesful, please login!');
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('unable to register');
        });
    }
  };

  return (
    <div className="main-view">
      <Container className="container-registration-form">
        <Form>
          <Form.Group controlId="formUsername" className="mb-3 mt-3">
            <Form.Label>Create Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Create Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Enter Email:</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
            {values.emailErr && <p>{values.emailErr}</p>}
          </Form.Group>
          <Form.Group controlId="formBirthday" className="mb-3">
            <Form.Label>Enter Birthday (Optional):</Form.Label>
            <Form.Control type="date" placeholder="Enter birthday" onChange={e => setBirthday(e.target.value)} />
          </Form.Group>
          <Button className="mb-3" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Container>
    </div>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
};