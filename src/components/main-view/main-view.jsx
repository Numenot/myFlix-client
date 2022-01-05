import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Pulp Fiction',
          Description: 'In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster\'s wife, a boxer and two small-time criminals.',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
          Genre: 'Crime/Drama',
          Director: 'Quentin Tarantino'
        },
        {
          _id: 2,
          Title: 'The Thing',
          Description: 'A research team finds an alien being that has fallen from the sky and is starting to hunt them down. Things take a sinister turn when they realise that the creature can take the shape of its victims.',
          ImagePath: 'https://m.media-amazon.com/images/I/91U8fI0EBdL._SY445_.jpg',
          Genre: 'Horror',
          Director: 'John Carpenter'
        },
        {
          _id: 3,
          Title: 'Big Trouble in Little China',
          Description: 'Jack Burton, a truck driver, gets dragged into the mysterious underworld beneath Chinatown where he faces an ancient sorcerer named Lo Pan.',
          ImagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmoXApny7AwjOTn3LV9vbfrvb0KTSsxVYtfEE5-y1qWvOiPsi',
          Genre: 'Action',
          Director: 'John Carpenter'
        }
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }

}

export default MainView;