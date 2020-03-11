import React, { Component, Fragment } from 'react';
import Header from '../components/Header'
import Box from '@material-ui/core/Box';
import axios from 'axios';
import MoviesList from '../components/MoviesList';
import _debounce from 'lodash-es/debounce';
import { Movie, MovieExtended } from '../types'
import { Container } from '@material-ui/core';
import history from "../history";
interface BookmarksState {
    results?: Movie[];
    totalResults: number;
    moviesList?: Movie[];
}

class Bookmarks extends Component<{}, BookmarksState> {
    constructor(props: any) {
        super(props)

        this.state = {
            totalResults: 0,
        }
    }

    componentDidMount() {
        const user: any = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        axios.get(`http://localhost:8000/api/v1/account/${parsedUser.id}/favorite`,{withCredentials: true})
            .then((res: any) => {
                if (res.status == 200) {
                    this.setState({
                        results: res.data.Search,
                        totalResults: res.data.totalResults
                    })
                }
            })
    }

    onShowDetails = (movie: Movie) => {
        if (movie) {
            history.push(`/${movie.imdbID}/details`, movie.imdbID)
        }
    }

    onAddToBookmarks = (movie: Movie) => {

    }

    render() {
        const { moviesList, results, totalResults } = this.state

        return (
            <>
                <Header />
                <Container>
                    <Box
                        mt={2}
                        display="flex"
                        overflow="auto"
                        flexDirection="row"
                        flexWrap="wrap"
                        justifyContent="space-evenly"
                    >
                            {moviesList &&
                                <MoviesList
                                    moviesList={results!}
                                    onAddToBookmarks={this.onAddToBookmarks}
                                    onShowDetails={this.onShowDetails}
                                    totalMovies={totalResults}
                                />
                            }
                    </Box>
                </Container>
            </>
        );
    }
}

export default Bookmarks;