import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../helpers/Authentication'

// const isAuthorized = isAuthenticated;
export class ProtectedRoute extends Component<any, {}> {
    // private backend_constants: isAuthenticated

    render() {
        const { component: Component, ...props } = this.props

        return (
            <Route
                {...props}
                render={props => (
                    !isAuthenticated
                        ? <Component {...props} />
                        : <Redirect to='/login' />
                )}
            />
        )
    }
}