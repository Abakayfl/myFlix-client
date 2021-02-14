import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss'

import { Row, Container, Col } from 'react-bootstrap';

export class MainView extends React.Component {
    constructor() {
        // Call the superclass constructor so React can initialize it
        super();
        // Initial state is set to null so we can destructure it later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            register: null
        };
    }
    // One of the "hooks" available in React coomponent
    componentDidMount() {
        axios.get('https://my-flix1.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    // Assign the result to the state
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie,
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    // when clicked, this function sets selectedMovie state back to null, rendering the main-view page on the DOM
    setInitialState() {
        this.setState({
            selectedMovie: null
        });
    }

    getMovies(token) {
        axios.get('https://my-flix1.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        // if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)} />;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className='main-view'>
                <div className='main-body text-center'>
                    {selectedMovie ? (
                        <MovieView
                            movie={selectedMovie}
                            onClick={() => this.setInitialState()}
                        />
                    ) : (
                            <Container className='p-5'>
                                <Row>
                                    {movies.map((movie) => (
                                        <Col xs={12} sm={6} md={4} key={movie._id} className='p-2'>
                                            <MovieCard
                                                key={movie._id}
                                                movie={movie}
                                                onClick={(movie) => this.onMovieClick(movie)}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        )}
                </div>
                <div className='test'></div>
            </div>
        );
    }
}
