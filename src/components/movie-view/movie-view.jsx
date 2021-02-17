import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import { Card, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {
    constructor() {
        super();
    }

    addtoFavorites(movie) {
        let token = localStorage.getItem('token');
        let url = "https://my-flix1.herokuapp.com/users/" + localStorage.getItem('user') + "/favorites/" + movie._id;
        axios.post(url, "", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log('Error Adding movie to favorites.')
        });
    }

    render() {
        const { movie } = this.props;
        if (!movie) return null;

        return (
            <div className="movie-view">
                <img className="movie-poster" src={movie.ImagePath} />
                <div className="movie-info">
                    <h1 className="movie-view-title">{movie.Title}</h1>
                    <Link to={`/directors/${movie.Director.Name}`} className="text-link"><h2 className="movie-view-director">Directed By {movie.Director.Name}</h2></Link>
                    <Link to={`/genres/${movie.Genre.Name}`} className="text-link"><small className="movie-view-genre">{movie.Genre.Name}</small></Link>
                    <p className="movie-view-description">{movie.Description}</p>
                    <button onClick={() => this.addtoFavorites(movie)} className="favorite-btn">
                        Favorite
                    </button>
                    <div>
                        <Link to="/" className="movie-view-flex-start-btn">
                            <button className="movie-view-back-btn">
                                Back
                    </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string,
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string
        }),
    }).isRequired
};

export default MovieView;