import React, { Component, Fragment } from 'react';
import Header from '../components/Header'
// import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

class Dashboard extends Component<{}> {
    // constructor(props: any) {
    //     super(props)

    //     this.state = initState();
    // }

    render() {
        // const { className } = this.props;
        // const {
        //     organization_id,
        //     organization_slug,
        //     organization_name,
        //     trackingIdAllowedPerOrgFeature,
        //     urls
        // } = this.state;

        return (
            <>
                <div className="dashboard-container">
                    <h1 className="main-header">Welcome to Moviefinder.</h1>
                    <h3 className="main-subheader">Type title or part of the title in order to find your match</h3>
                    <TextField
                        id="main-search-bar"
                        style={{ margin: 8 }}
                        placeholder="Search movie by title..."
                        size="medium"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        >
                            </TextField> 
             
                </div>
            </>
        );
    }
}

export default Dashboard;