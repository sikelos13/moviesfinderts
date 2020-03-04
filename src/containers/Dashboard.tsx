import React, { Component, Fragment } from 'react';
import Header from '../components/Header'
// import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import DirectionsIcon from '@material-ui/icons/Directions';
import _debounce from 'lodash-es/debounce';
import { Movie } from '../types'
import { Container } from '@material-ui/core';
interface DashboardState {
    inputSearch: string;
    results?: Movie[];
}
interface DashboardProps {
    username: string;
}

class Dashboard extends Component<DashboardProps, DashboardState> {
    constructor(props: any) {
        super(props)

        this.state = {
            inputSearch: ""
        }
        // this.handleSearchInput = _debounce(this.handleSearchInput, 1000);
    }
 
    handleSearch = (e: any) => {
        // event.persist();
        this.setState({ inputSearch: e.target.value });
        this.handleSearchInput(e.target.value.trim())
    }

    handleSearchInput = (value: string) => {
        console.log(value)
    }

    render() {
        const { username } = this.props;

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
                    </Container>
                </div>
            </>
        );
    }
}

export default Dashboard;