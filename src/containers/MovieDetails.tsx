import React, { Component, Fragment } from 'react';
// import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import Header from '../components/Header'
import Box from '@material-ui/core/Box';
import { MovieExtended } from '../types';
import history from "../history";
import axios from 'axios';

interface MovieDetailsState {
    movie?: MovieExtended
}


class MovieDetails extends Component<{}, MovieDetailsState> {
    constructor(props: any) {
        super(props)

        this.state = {
        
        };
    }
    componentDidMount() {
        let movieId= history.location.state
        console.log(movieId)
        
        axios.get(`http://localhost:8000/api/v1/search/movie/${movieId}`)
            .then((res: any) => {
            if(res.status == 200) {
                this.setState({
                    movie: res.data,
                })
            }
        })
    }

    handleHistoryChange = () => {
        history.push('/dashboard');
    }

    render() {
        const { movie } = this.state

        return (
            <>
                <Header />
                <Container>
                    <Box width="100%" height="720px" display="flex" justifyContent="center">
                        {movie && 
                            <>
                            <img src={movie.Poster} alt={movie.Title} className="image-details" />
                            <Box>
                                <h1>{movie.Title}</h1>
                            </Box>
                            </>
                        }
                    </Box>
                    <Button color="primary" onClick={this.handleHistoryChange}>Back to dashboard</Button>
                </Container>
            </>
        );
    }
}

export default MovieDetails;