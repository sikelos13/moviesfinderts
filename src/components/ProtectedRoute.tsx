import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = (auth: string | null) => {

    if(auth === 'true') {
        return true;
    } else if(auth == undefined || auth == null) {
        return false;
    } else {
        return false
    }
}

// const isAuthorized = isAuthenticated;
export class ProtectedRoute extends Component<any, {}> {

    render() {
        const isAuthorized = localStorage.getItem('isAuthorized');
        const { component: Component, ...props } = this.props
        return (
            <Route
                {...props}
                render={(props: any) => (
                    <>
                    {isAuthenticated(isAuthorized)
                        ? <Component {...props} />
                        : <Redirect to='/login' />
                    }
                    </>
                )}
            />
        )
    }
}