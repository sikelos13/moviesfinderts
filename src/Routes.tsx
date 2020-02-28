import React, { Component } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from "./containers/Dashboard";
import LoginIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
// import PrivateRoute from "./helpers/PrivateRoute";

interface AppProps {
    isAuthenticated: boolean;
}

export default class Routes extends Component<AppProps, {}> {
    render() {
        const {isAuthenticated} = this.props
        return (
                <Switch>
                        <Route exact path="/special-devices" component={Dashboard} />
                     
                        {!isAuthenticated &&
                            <>
                                <Route exact path="/login" component={LoginIn} />
                                <Route exact path="/signup" component={SignUp} />
                            </>
                        }
                        <Redirect to="/login-in" />
                </Switch>
        );
    }
}