import React, { Component } from 'react';
import Header from '../components/Header'
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MoviesList from '../components/MoviesList';
import _debounce from 'lodash-es/debounce';
import { Movie, MovieExtended } from '../types'
import { Container } from '@material-ui/core';
import history from "../history";

interface DashboardState {
    inputSearch: string;
    results?: Movie[];
    totalResults: number;
    movie?: MovieExtended;
    dashboardErrorMessage: string
}

interface DashboardProps {
    username: string;
}

class Dashboard extends Component<DashboardProps, DashboardState> {
    constructor(props: any) {
        super(props)

        this.state = {
            inputSearch: "",
            totalResults: 0,
            dashboardErrorMessage: ""
        }
        this.handleSearchInput = _debounce(this.handleSearchInput, 1000);
    }

    handleSearch = (e: any) => {
        this.setState({ inputSearch: e.target.value });
        this.setState({dashboardErrorMessage: ""});
        this.handleSearchInput(e.target.value.trim())
    }

    handleSearchInput = (value: string) => {
        if (value !== "") {
            axios.get(`http://localhost:8000/api/v1/search/movies?q=${value}`, { withCredentials: true })
                .then((res: any) => {
                    if (res.data.Response === "True") {
                        this.setState({
                            results: res.data.Search,
                            totalResults: res.data.totalResults
                        })
                    }else if (res.data.Response === "False") {
                        this.setState({
                            results: [],
                            totalResults: 0,
                            dashboardErrorMessage: res.data.Error
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
        } else {
            this.setState({
                results: [],
                totalResults: 0
            })
        }
    }

    onShowDetails = (movie: Movie) => {
        if (movie) {
            history.push(`/${movie.imdbID}/details`, movie.imdbID)
        }
    }

    onHandleBookmark = (movie: Movie) => {
        const { results } = this.state;

        const user: any = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        if (!movie.isBookmarked) {
            axios.put(`http://localhost:8000/api/v1/account/${parsedUser.id}/favorite/${movie.imdbID}`, "", { withCredentials: true })
                .then((res: any) => {
                    if (res.status == 200) {
                        const newMovieList = results!.map((item: Movie) => {
                            if (item.imdbID === movie.imdbID) {
                                const updatedMovie = {
                                    ...item,
                                    isBookmarked: true
                                }
                                return updatedMovie
                            }
                            return item;
                        });
                        this.setState({
                            results: newMovieList
                        });
                    }
                }).catch(err => {
                    const newMovieList = results!.map((item: Movie) => {
                        if (item.imdbID === movie.imdbID) {
                            const updatedMovie = {
                                ...item,
                                errorMessage: err.response.data.message
                            }
                            return updatedMovie
                        }
                        return item;
                    });
                    this.setState({
                        results: newMovieList
                    });
                })
        } else {
            axios.delete(`http://localhost:8000/api/v1/account/${parsedUser.id}/favorite/${movie.imdbID}`, { withCredentials: true })
            .then((res: any) => {
 
                const newMovieList = results!.map((item: Movie) => {
                    if (item.imdbID === movie.imdbID) {
                        const updatedMovie = {
                            ...item,
                            isBookmarked: false
                        }
                        return updatedMovie
                    }
                    return item;
                });
                    this.setState({results: newMovieList})
                })
        }
    }

    render() {
        const { results, totalResults, dashboardErrorMessage } = this.state;

        return (
            <>
                <div className="main-bg-image">
                    <Header />
                    <Container>
                        <div className="dashboard-container">
                            <h1 className="main-header">Welcome to Moviefinder.</h1>
                            <h3 className="main-subheader">Type title or part of the title in order to find your match</h3>
                            {dashboardErrorMessage &&
                                <h4 className="error-dashboard">{dashboardErrorMessage}</h4>
                            }

                            <TextField
                                id="main-search-bar"
                                style={{ margin: 8 }}
                                placeholder="Search movie by title..."
                                size="medium"
                                margin="normal"
                                onChange={this.handleSearch}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />

                        </div>
                        {results &&
                            <MoviesList
                                moviesList={results!}
                                onHandleBookmark={this.onHandleBookmark}
                                onShowDetails={this.onShowDetails}
                                totalMovies={totalResults}
                            />
                        }
                    </Container>
                </div>
            </>
        );
    }
}

export default Dashboard;