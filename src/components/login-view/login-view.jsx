import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './login-view.scss';

import { Form, Button } from 'react-bootstrap';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://my-flix1.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (
        <React.Fragment>
            <Form className='login-form'>
                <h1 className='login-header'>Login Here:</h1>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Your Username goes here!'
                    />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Your password goes here!'
                    />
                </Form.Group>
                <Button onClick={handleSubmit} variant='dark' type='submit'>
                    Login
                </Button>
            </Form>
        </React.Fragment>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        pasword: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func
};