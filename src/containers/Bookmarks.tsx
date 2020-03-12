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
    moviesIdList?: number[];
    totalResults: number;
    moviesList: MovieExtended[];
    isBookmark: boolean;
}

class Bookmarks extends Component<{}, BookmarksState> {
    constructor(props: any) {
        super(props)

        this.state = {
            totalResults: 0,
            moviesList: [],
            isBookmark: true
        }
    }

   async componentDidMount() {
        const user: any = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

       await axios.get(`http://localhost:8000/api/v1/account/${parsedUser.id}/favorite`, { withCredentials: true })
            .then((res: any) => res.data)
            .then((data: any) => {
                    this.setState({moviesList: data.Search})
                })
    }

    onShowDetails = (movie: Movie) => {
        if (movie) {
            history.push(`/${movie.imdbID}/details`, movie.imdbID)
        }
    }

    onHandleBookmark = (movie: Movie) => {

    }

    render() {
        const { moviesList, totalResults,isBookmark } = this.state

        return (
            <>
                <Header />
                <Container>
                <h1 className="main-header">My Bookmarks</h1>
                    <Box
                        mt={2}
                        display="flex"
                        overflow="auto"
                        flexDirection="row"
                        flexWrap="wrap"
                        justifyContent="space-evenly"
                    >
                        {moviesList && moviesList.length > 0 &&
                            <MoviesList
                                moviesList={moviesList}
                                isBookmark={isBookmark}
                                onHandleBookmark={this.onHandleBookmark}
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