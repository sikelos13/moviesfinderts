import React, { Component } from 'react';
import Header from '../components/Header'
import axios from 'axios';
import MoviesList from '../components/MoviesList';
import { Movie, MovieExtended } from '../types'
import { Container, Button } from '@material-ui/core';
import history from "../history";
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import BackArrow from '@material-ui/icons/ArrowLeft';

interface BookmarksState {
    moviesIdList?: number[];
    totalResults: number;
    moviesList: MovieExtended[];
}

class Bookmarks extends Component<{}, BookmarksState> {
    constructor(props: any) {
        super(props)

        this.state = {
            totalResults: 0,
            moviesList: [],
        }
    }

    async componentDidMount() {
        const user: any = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        await axios.get(`http://localhost:8000/api/v1/account/${parsedUser.id}/favorite`, { withCredentials: true })
            .then((res: any) => res.data)
            .then((data: any) => {
                const newData = data.map((item: Movie) => {
                    const movie = {
                        ...item,
                        isBookmarked: true
                    }
                    return movie;
                })
                this.setState({ moviesList: newData })
            }).catch(err => {
                console.log(err)
            })
    }

    handleHistoryChange = () => {
        history.push('/dashboard');
    }

    onShowDetails = (movie: Movie) => {
        if (movie) {
            history.push(`/${movie.imdbID}/details`, movie.imdbID)
        }
    }

    onHandleBookmark = (movie: Movie) => {
        const { moviesList } = this.state;
        const user: any = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        if (movie.isBookmarked) {
            axios.delete(`http://localhost:8000/api/v1/account/${parsedUser.id}/favorite/${movie.imdbID}`, { withCredentials: true })
                .then((res: any) => {
                    const filteredArray = moviesList.filter((item: Movie) => {
                        return item.imdbID !== movie.imdbID;
                    });
                    this.setState({ moviesList: filteredArray })
                })
        }
    }

    render() {
        const { moviesList, totalResults } = this.state

        return (
            <>
                <Header />
                <Container>
                    <Box display="flex" alignItems="center" justifyContent="space-evenly" flexDirection="row-reverse">
                    <Button
                        variant="contained"
                        color="default"
                        className="back-button"
                        onClick={this.handleHistoryChange}
                        startIcon={<BackArrow />}
                    >
                        Back to dashboard
                    </Button>
                    <h1 className="main-header">My Bookmarks</h1>
            
                    </Box>

                    {moviesList && moviesList.length > 0
                        ? <MoviesList
                            moviesList={moviesList}
                            onHandleBookmark={this.onHandleBookmark}
                            onShowDetails={this.onShowDetails}
                            totalMovies={totalResults}
                        />
                        : <Box textAlign="center" fontSize="20px">Your bookmarks are empty. Return to your <Link className="link-button" to="/dashboard">Dashboard</Link> to search movies</Box>
                    }
                </Container>
            </>
        );
    }
}

export default Bookmarks;