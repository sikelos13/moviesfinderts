import React, { Component, Fragment } from 'react';
// import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { Movie } from '../types'
import { Container } from '@material-ui/core';
import Header from '../components/Header'

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
              <Header />
                    <Container>
                <h1>Welcome to bookmarks</h1>
                    </Container>
            </>
        );
    }
}

export default Dashboard;