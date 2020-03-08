import React, { Component, Fragment } from 'react';
import Header from '../components/Header'
// import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import axios from 'axios';
import MoviesList from '../components/MoviesList';
import _debounce from 'lodash-es/debounce';
import { Movie,MovieExtended } from '../types'
import { Container } from '@material-ui/core';
import history from "../history";
interface DashboardState {
    inputSearch: string;
    results?: Movie[];
    totalResults: number;
    movie?: MovieExtended;
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
        }
        this.handleSearchInput = _debounce(this.handleSearchInput, 1000);
    }
 
    handleSearch = (e: any) => {
        // event.persist();
        this.setState({ inputSearch: e.target.value });
        this.handleSearchInput(e.target.value.trim())
    }

    handleSearchInput = (value: string) => {
        console.log(value)
            if (value !== "") {
                axios.get(`http://localhost:8000/api/v1/search/movies?q=${value}`)
                .then((res: any) => {
                console.log(res);
                if(res.status == 200) {
                    this.setState({
                        results: res.data.Search,
                        totalResults: res.data.totalResults
                    })
                }
                })
        }else {
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

    onAddToBookmarks = (movie: Movie) => {

    }

    render() {
        const { results, totalResults } = this.state;

        return (
            <>
                 <div className="main-bg-image">
                <Header />
                    <Container>
                        <div className="dashboard-container">
                            <h1 className="main-header">Welcome to Moviefinder.</h1>
                            <h3 className="main-subheader">Type title or part of the title in order to find your match</h3>
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
                                    onAddToBookmarks={this.onAddToBookmarks}
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