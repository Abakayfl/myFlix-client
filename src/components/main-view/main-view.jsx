// src/components/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// #0
import { setMovies } from '../../actions/actions';

import './main-view.scss'

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../register-view/register-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';


class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            user: null
        };
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

    getMovies(token) {
        axios.get('https://my-flix1.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {

                // #1
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onSignOut() {
        localStorage.clear();
        this.setState({
            user: null

        })
    }

    render() {

        // #2
        let { movies, movie } = this.props;
        let { user } = this.state;

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
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return <MoviesList movies={movies} />;
                    }} />
                    <Route path="/register" render={() => <RegisterView />} />
                    <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

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
            </Router>
        );
    }
}

// #3
let mapStateToProps = state => {
    return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies })(MainView);