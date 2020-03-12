import React, { Component, Fragment } from 'react';
import { Container, Button } from '@material-ui/core';
import Header from '../components/Header'
import Box from '@material-ui/core/Box';
import { MovieExtended } from '../types';
import history from "../history";
import axios from 'axios';
import BackArrow from '@material-ui/icons/ArrowLeft';

interface MovieDetailsState {
    movie?: MovieExtended;
    favoriteMessage: string;
}

class MovieDetails extends Component<{}, MovieDetailsState> {
    constructor(props: any) {
        super(props)

        this.state = {
            favoriteMessage: ""
        };
    }
    componentDidMount() {
        let movieId = history.location.state

        axios.get(`http://localhost:8000/api/v1/search/movie/${movieId}`, { withCredentials: true })
            .then((res: any) => {
                if (res.status == 200) {
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
        const { movie, favoriteMessage } = this.state

        return (
            <>
                <Header />
                <Container>
                    <Box width="100%" height="720px" display="flex" justifyContent="center">
                        {movie &&
                            <>
                                <Box id="image-frame-wrapper" maxHeight="600px" borderRadius="7px" m="50px">
                                    <img src={movie.Poster} alt={movie.Title} className="frame3" />
                                </Box>
                                <Box id="information-container" m="50px" borderRadius="7px" display="flex" flexDirection="column" maxHeight="600px" p="10px">
                                    <Box display="flex" flexDirection="row">
                                        <h1>{movie.Title}</h1>
                                    </Box>
                                    <Box>
                                        <p>Box Office: {movie.BoxOffice}</p>
                                        <p>Country: {movie.Country}</p>
                                        <p>Director: {movie.Director}</p>
                                        <p>Actors: {movie.Actors}</p>
                                        <p>Genre {movie.Genre}</p>
                                        <p>Rated: {movie.Rated}</p>
                                        <p>Metascore: {movie.Metascore}</p>
                                        <p>IMDB Rating: {movie.imdbRating}</p>
                                        <p>IMDB Votes: {movie.imdbVotes}</p>
                                        <p>Runtime {movie.Runtime}</p>
                                        <p>{movie.Plot}</p>

                                    </Box>
                                </Box>
                            </>
                        }
                    </Box>
                    <Button
                        variant="contained"
                        color="default"
                        id="back-button"
                        onClick={this.handleHistoryChange}
                        startIcon={<BackArrow />}
                    >
                        Back to dashboard
                    </Button>
                    <Box fontSize="30px" color="success" textAlign="center">{favoriteMessage}</Box>
                </Container>
            </>
        );
    }
}

export default MovieDetails;