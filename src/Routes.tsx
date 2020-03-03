import React, { Component } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from "./containers/Dashboard";
import LoginIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import Header from './components/Header'
import Bookmarks from "./containers/Bookmarks";
import { Container } from '@material-ui/core';
import { ProtectedRoute } from './components/ProtectedRoute';
import Account from './containers/Account';
import Notfound from './components/Notfound';

export default class Routes extends Component<{}, {}> {
    render() {
      
        return (
                  <>
                  <Switch>
                      <ProtectedRoute path="/dashboard" component={Dashboard} />
                      <ProtectedRoute path="/account-settings" component={Account} />
                      <ProtectedRoute path="/bookmarks" component={Bookmarks} />
                      <Route exact path="/login" component={LoginIn} />
                      <Route exact path="/signup" component={SignUp} />
                      <Route component={Notfound} />
                    </Switch>
              </>
                        
        );
    }
}