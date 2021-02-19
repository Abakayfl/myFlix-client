import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../register-view/register-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';


import './main-view.scss'

// import { Row, Container, Col } from 'react-bootstrap';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            user: null,
            newUser: false
        }
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

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('https://my-flix1.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                this.setState({
                    movies: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onSignOut() {
        localStorage.clear();
        this.setState({
            user: null

        })

    }

    render() {
        const { user, movies } = this.state;
        const { movie } = this.props;

        return (
            <Router>
                <div className="main-view">
                    <div className="nav">
                        <h1>MyFlix</h1>
                        {user &&
                            <div className="nav-button-flex">
                                <Link to="/users/:userId">
                                    <button className="account-btn">
                                        Profile
                                </button>
                                </Link>
                                <Link to="/" ><button onClick={() => this.onSignOut()} className="signout-btn">Sign Out</button></Link>
                            </div>
                        }
                    </div>
                    <div className="movie-grid">
                        <Route exact path="/" render={() => {
                            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                            return movies.map(movie => <MovieCard className="moviecard" key={movie._id} movie={movie} />)
                        }
                        } />
                        <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} />} />
                        <Route path="/register" render={() => <RegisterView />} />
                        <Route path="/directors/:name" render={({ match }) => {
                            if (!movies) return <div className="main-view" />;
                            return <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name)} movies={movies} />
                        }}
                        />
                        <Route path="/genres/:name" render={({ match }) => {
                            if (!movies) return <div className="main-view" />;
                            return <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name)} movies={movies} />
                        }}
                        />
                        <Route path="/users/:userId" render={() => {
                            return <ProfileView movies={movies} movie={movie} />
                        }}
                        />
                        <Route path="/update/:userId" render={() => {
                            return <ProfileUpdate />
                        }}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}
export default MainView;