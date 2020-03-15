import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Dashboard from "./containers/Dashboard";
import LoginIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import Bookmarks from "./containers/Bookmarks";
import { ProtectedRoute } from './components/ProtectedRoute';
import Account from './containers/Account';
import Notfound from './components/Notfound';
import MovieDetails from './containers/MovieDetails';

export default class Routes extends Component<{}, {}> {
    render() {
      
        return (
                  <>
                  <Switch>
                      <ProtectedRoute path="/dashboard" component={Dashboard} />
                      <ProtectedRoute path="/account-settings" component={Account} />
                      <ProtectedRoute path="/bookmarks" component={Bookmarks} />
                      <ProtectedRoute path="/:id/details" component={MovieDetails} />
                      <Route exact path="/" component={LoginIn} />
                      <Route exact path="/signup" component={SignUp} />
                      <Route component={Notfound} />
                    </Switch>
              </>
                        
        );
    }
}