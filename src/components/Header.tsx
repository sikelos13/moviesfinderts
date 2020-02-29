import React, { Component } from 'react'
import { NavLink, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box, Breadcrumbs, Input } from '@material-ui/core';
import HeaderLogo from '../images/header-logo.png'
import HomeIcon from '@material-ui/icons/Home';
import { SvgIcon } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

interface HeaderState {
    username: string;
}
class Header extends Component<{}, HeaderState> {
    constructor(props: any) {
        super(props)

        this.state = {
            username: ""
        };
    }
    componentDidMount = () => {
        const user: any = localStorage.getItem('user');
        const parsedUser =  JSON.parse(user);

        console.log(parsedUser)
        this.setState({username: parsedUser.username})
    }
    render() {
        // const {  location, history } = this.props;
        const { username } = this.state;
        return (
            <>
                <div className="box-header">
                    <div className="head__container">
                        <Box alignSelf="center">
                            <img src={HeaderLogo} alt="header-logo" className="header-logo" />
                        </Box>
                        <nav className="header-nav">
                            <ul className="nav-list">
                                <li className="dashboard-link">
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="bookmarks-link">
                                    <Link to="/bookmarks">Bookmarks</Link>
                                </li>
                                <li className="donations-link">
                                    <Link to="/donations">Donate</Link>
                                </li>
                            </ul>
                            <Box alignSelf="center">
                            <SvgIcon component={SearchIcon} />
                        </Box>
                           <input type="text" className="navbar-search" placeholder="Search movie by title..."/>
                        </nav>
                        <Box alignSelf="center">
                            <SvgIcon component={AccountCircleIcon} />
                            {username}
                        </Box>
                    </div>
                </div>
                <Breadcrumbs className="Head__Breadcrumb Head__Breadcrumb--Active">
                    <Switch>
                        <Route exact path="/dashboard" render={() => 'Dashboard'} />
                        <Route exact path="/bookmarks" render={() => 'Bookmarks'} />
                        <Route exact path="/donations" render={() => 'Donations'} />
                    </Switch>
                </Breadcrumbs>
            </>
        );
    }
}


export default Header