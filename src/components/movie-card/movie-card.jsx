import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (

            <Link className="movie-card-link" to={`/movies/${movie._id}`}>
                <div className="movie-card">
                    <img className="img-sizer" src={movie.ImagePath} />
                    <div className="movie-overlay">
                        <h1 className="movie-card-title">{movie.Title}</h1>
                        <small className="movie-card-genre">{movie.Genre.Name}</small>
                        <p className="movie-card-description">{movie.Description}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string,
        }).isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string
        }).isRequired,
    }).isRequired
};

export default MovieCard;