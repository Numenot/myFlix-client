import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { Menubar } from "../navbar/navbar";
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';

import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      user: null
    }
  }

  getMovies(token) {
    axios.get('https://myflixmovieapp-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Menubar user={user} />
        <div>
          <Row className="main-view justify-content-md-center">

            {/* Main View */}
            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view"></div>
              return <MoviesList movies={movies} />;
            }} />

            {/* Registration View */}
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            {/* Single Movie View */}
            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            {/* Director details view */}
            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            {/* Genre details view */}
            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            {/* User profile view */}
            <Route path="/users/:Username" render={({ history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
                <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }}
            />
          </Row>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);