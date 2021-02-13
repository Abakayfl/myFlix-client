import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
    render() {
        // This is given to the <MovieCard/> component by the MainView
        // MainView is connected to the database via the movies endpoint of the API
        const { movie, onClick } = this.props;

        return (
            <Card className='movie-card' border='info'>
                <Card.Img className='movie-img' variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    // shape({...}) means it expects an object
    movie: PropTypes.shape({
        // movie prop may contain Title, and IF it does, it must be a string
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Biography: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birthdate: PropTypes.string
        }),
        Featured: PropTypes.bool
    }).isRequired,
    // props object must contain onClick and it MUST be a function
    onClick: PropTypes.func.isRequired
};