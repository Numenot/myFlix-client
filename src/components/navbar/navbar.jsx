import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

import './navbar.scss';

export function Menubar({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-dark">
      <Navbar.Brand className="navbar-links" href="/">myFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
        <Nav>
          {isAuth() && (<Nav.Link className="navbar-links" href="/">Home</Nav.Link>)}
          {isAuth() && (<Nav.Link className="navbar-links" href={`/users/${user}`}>{user}</Nav.Link>)}
        </Nav>
        <Nav>
          {!isAuth() && (<Nav.Link className="navbar-links" href="/">Log In</Nav.Link>)}
          {!isAuth() && (<Nav.Link className="navbar-links" href="/register">Create Account</Nav.Link>)}
          {isAuth() && (<Button variant="link" className="navbar-links" onClick={() => { onLoggedOut() }}>Sign Out</Button>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}