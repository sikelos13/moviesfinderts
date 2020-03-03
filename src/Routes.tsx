import React, { Component } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from "./containers/Dashboard";
import LoginIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
// import PrivateRoute from "./helpers/PrivateRoute";
import Header from './components/Header'
import Bookmarks from "./containers/Bookmarks";
import { Container } from '@material-ui/core';
import { ProtectedRoute } from './components/ProtectedRoute';

interface RoutesState {
    isAuthenticated: boolean;
    defaultPage: string;
}

export default class Routes extends Component<{}, RoutesState> {
    constructor(props: any) {
        super(props);
    
        this.state = {
            isAuthenticated: false,
            defaultPage: "/dashboard"
        }
    }
    
    componentDidMount = () => {
    
      if( localStorage.getItem("isAuthorized") === "true") {
        // console.log(localStorage.getItem("isAuthorized"))
        this.setState({
          isAuthenticated: true
        })
      } else {
        console.log("test2")
        this.setState({
          isAuthenticated: false
        })
      }
    }
    
    render() {
        // const isAuthenticated =  localStorage.getItem('isAuthorized') === 'true' ? true : false;
        const { isAuthenticated } = this.state;
        return (
            
                <Switch>
                            <>
                            {isAuthenticated &&
                                <>
                                <div className="main-bg-image">
                                    <Header />
                                    <Container>
                                        <ProtectedRoute  path="/dashboard" component={Dashboard} />
                                        <ProtectedRoute  path="/bookmarks" component={Bookmarks} />
                                    </Container>
                                    </div>
                                </>
                                // :<Redirect to='/login' />
                            }
                           
                            <Route path="/login" component={LoginIn} />
                            <Route path="/signup" component={SignUp} />
                            </>
                        
                </Switch>
        );
    }
}