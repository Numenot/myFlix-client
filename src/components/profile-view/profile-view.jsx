import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button, Card, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  //Get user details by username
  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://myflixmovieapp-myflix.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Remove favorite movie from favorite list
  onRemoveFavorite = (e, movie) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://myflixmovieapp-myflix.herokuapp.com/users/${username}/movies/${movie._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Allow user to edit their user details
  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://myflixmovieapp-myflix.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile is updated!");
        window.open(`/users/${Username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Delete user account
  onDeleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://myflixmovieapp-myflix.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        alert("Account has been deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {
    const { movies } = this.props;
    const { FavoriteMovies, Username, Email, Birthday } = this.state;
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Be careful, this is permanent!
      </Tooltip>
    );

    return (
      <div>
        <Row>

          {/* Display user details */}
          <Col className="user-profile mb-4" md={{ offset: 2, span: 4 }}>
            <div className="profile-container">
              <h2 className="title">User details: </h2>
              <br />
              <span className="label">Username: </span>
              <span className="value">{Username}</span>
              <br />
              <br />
              <span className="label">Password: </span>
              <span className="value">*********</span>
              <br />
              <br />
              <span className="label">Email: </span>
              <span className="value">{Email}</span>
              <br />
              <br />
              <span className="label">Birthday: </span>
              <span className="value">{Birthday}</span>
            </div>
          </Col>

          {/* Form to update user details or delete account */}
          <Col className="user-profile_update-form mb-4" md={4}>
            <h2 className="title">Update information: </h2>
            <br />
            <Form className="update-form" onSubmit={(e) => this.editUser(e, this.Username, this.Password, this.Email, this.Birthday)}>
              <Form.Group className="mb-2">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="Email" placeholder="Enter Email" onChange={(e) => this.setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
              </Form.Group>
              <br />
              <div className="bt">
                <Button type="submit" onClick={this.editUser}>Update User</Button>
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip} >
                  <Button className="delete-button ml-2" variant="danger" onClick={() => this.onDeleteUser()} > Delete Account </Button>
                </OverlayTrigger>
              </div>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>{Username}'s favorite movies list</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {FavoriteMovies.length === 0 && (
              <div className="text-center">No Favorite Movie</div>
            )}
            <Row className="favorite-container">
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    FavoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Card className="favorite-movie card-content" key={movie._id} >
                        <Card.Img className="fav-poster" src={movie.ImagePath} />
                        <Card.ImgOverlay className="fav-overlay">
                          <Button size="md" variant="danger" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)} >Remove</Button>
                        </Card.ImgOverlay>
                      </Card>
                    );
                  }
                })}
            </Row>
          </Col>
        </Row>
      </div >
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};