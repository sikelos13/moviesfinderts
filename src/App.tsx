import React from "react";
import { History } from "history";
import { ApplicationState } from "./types";
import { Router } from 'react-router-dom';
import Routes from './Routes';
import Header from './components/Header'
import './App.scss';
import history from './history'

// Any additional component props go here.
interface OwnProps {
    history: History;
}

// Create an intersection type of the component props and our Redux props.

class App extends React.Component<OwnProps,ApplicationState> {
  constructor(props: OwnProps) {
    super(props);

    this.state = {
        isAuthenticated: false
    }
}

componentDidMount = () => {

  if( localStorage.getItem("isAuthorized") === "true") {
    this.setState({
      isAuthenticated: true
    })
    history.push('/dashboard')
  } else {
    this.setState({
      isAuthenticated: false
    })
  }
}

    public render() {
        const { history } = this.props;
      const { isAuthenticated } = this.state
        return (
          <Router history={history}>
            <Routes />
            
          </Router>
        );
    }
}

export default App;