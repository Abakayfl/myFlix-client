import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './director-view.scss';
import MovieCard from '../movie-card/movie-card';

export class DirectorView extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { movies, director } = this.props;
        return (
            <div className="director-view-container">
                <div className="director-view">
                    <Link to="/" className="director-view-flex-start-btn">
                        <button className="director-view-back-btn">
                            Back
                        </button>
                    </Link>
                    <div className="director-container">
                        <div className="director-info">
                            <h1 className="director-view-director">{director.Director.Name}</h1>
                            <small className="director-view-birthday">Born {director.Director.Birthday}</small>
                            <p className="director-view-bio">{director.Director.Bio}</p>
                        </div>
                    </div>
                </div>
                <h2 className="director-title">Movies by {director.Director.Name}</h2>
                <div className="director-view-movies-flex">
                    {movies.map((movie) => {
                        if (movie.Director.Name === director.Director.Name) {
                            return (
                                <MovieCard key={movie._id} movie={movie} />
                            )
                        }
                    })}
                </div>
            </div>

        )
    }
}

// DirectorView.propTypes = {
//     movie: PropTypes.shape({
//         Director: PropTypes.shape({
//             Name: PropTypes.string.isRequired,
//             Birthday: PropTypes.string.isRequired,
//             Bio: PropTypes.string.isRequired
//         })
//     }).isRequired
// }


export default DirectorView;