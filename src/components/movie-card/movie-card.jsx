import React from 'react';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <div class="container d-flex flex-wrap justify-content-center">
                <div className="movie-card bg-white m-2 p-2 rounded d-flex flex-column justify-content-between align-items-center">
                    <div className="d-flex flex-column align-items-center">
                        <img src={movie.ImagePath} className="movie-card-img rounded mb-2" />
                        <h1 className="h5 text-center text-dark font-weight-semi-bold">{movie.Title}</h1>
                    </div>
                    <p className="movie-card-description text-muted">{movie.Description}</p>
                    <Link className="movie-card-link" to={`/movies/${movie._id}`}>
                        <button size="sm" variant="primary" className="w-100">
                            View
                    </button>
                    </Link>
                </div>
            </div>
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

// Code forCardView
// <Card className='movie-card'>
//     <Card.Img className='movie-img' variant="top" src={movie.ImagePath} />
//     <Card.Body>
//         <Card.Title>{movie.Title}</Card.Title>
//         <Card.Text>{movie.Description}</Card.Text>
//         <Link className="movie-card-link" to={`/movies/${movie._id}`}>
//             <Button size="sm" variant="primary" className="w-100">
//                 View
//                                 </Button>
//         </Link>
//     </Card.Body>
// </Card>
