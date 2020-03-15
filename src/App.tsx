import React from "react";
import { History } from "history";
import { ApplicationState } from "./types";
import { Router } from 'react-router-dom';
import Routes from './Routes';
import './App.scss';

// Any additional component props go here.
interface OwnProps {
    history: History;
}


class App extends React.Component<OwnProps,ApplicationState> {

    public render() {
        const { history } = this.props;

        return (
          <Router history={history}>
            <Routes />
          </Router>
        );
    }
}

export default App;