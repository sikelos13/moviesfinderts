import React, { Component } from 'react';
import Header from '../components/Header'
import axios from 'axios';
import MoviesList from '../components/MoviesList';
import { Movie, MovieExtended } from '../types'
import { Container } from '@material-ui/core';
import history from "../history";

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
                    this.setState({moviesList: newData})
                })
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

        if(movie.isBookmarked) {
             axios.delete(`http://localhost:8000/api/v1/account/${parsedUser.id}/favorite/${movie.imdbID}`, { withCredentials: true })
            .then((res: any) => {
                const filteredArray = moviesList.filter((item: Movie) => {
                    return item.imdbID !== movie.imdbID;
                });
                    this.setState({moviesList: filteredArray})
                })
        }
    }

    render() {
        const { moviesList, totalResults } = this.state

        return (
            <>
                <Header />
                <Container>
                <h1 className="main-header">My Bookmarks</h1>
                        {moviesList && moviesList.length > 0 &&
                            <MoviesList
                                moviesList={moviesList}
                                onHandleBookmark={this.onHandleBookmark}
                                onShowDetails={this.onShowDetails}
                                totalMovies={totalResults}
                            />
                        }
                </Container>
            </>
        );
    }
}

export default Bookmarks;