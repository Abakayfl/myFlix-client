import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './genre-view.scss';
import MovieCard from '../movie-card/movie-card';

export class GenreView extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { movies, genre } = this.props;
        return (
            <div className="genre-container">
                <div className="genre-view">
                    <Link className="genre-flex-start-btn" to="/">
                        <button className="genre-view-back-btn">
                            Back
                        </button>
                    </Link>
                    <div className="genre-info-container">
                        <div className="genre-info">
                            <h1 className="genre-view-name">{genre.Genre.Name}</h1>
                            <p className="genre-view-description">{genre.Genre.Description}</p>
                        </div>
                    </div>
                </div>
                <h2 className="genre-title">{genre.Genre.Name} Movies</h2>
                <div className="genre-movies-flex">
                    {movies.map((movie) => {
                        if (movie.Genre.Name === genre.Genre.Name) {
                            return (
                                <MovieCard className="moviecard" key={movie._id} movie={movie} />
                            )
                        }
                    })}
                </div>
            </div>

        )
    }
}

GenreView.propTypes = {
    movie: PropTypes.shape({
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
    }).isRequired
}

export default GenreView;