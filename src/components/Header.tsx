import React, { Component } from 'react'
import { NavLink, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box, Breadcrumbs, Input, Button, Menu, MenuItem } from '@material-ui/core';
import HeaderLogo from '../images/header-logo.png'
import { SvgIcon } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import history from '../history'
import {ProtectedRoute}  from '../components/ProtectedRoute';

interface HeaderState {
    username: string;
    anchorEl?: any | null;
    isLoggedOut: boolean;
}
class Header extends Component<{}, HeaderState> {
    constructor(props: any) {
        super(props)

        this.state = {
            username: "",
            isLoggedOut: false,
        };
    }
    componentDidMount = () => {
        const user: any = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        console.log(parsedUser)
        this.setState({ username: parsedUser && parsedUser != null && parsedUser.username})
    }

    handleDropmenu = (event: any) => {
        this.setAnchorEl(event.currentTarget);

    }
    handleClose = () => {
        this.setAnchorEl(null);
    };

    handleLogout = () => {
        this.setAnchorEl(null);
        localStorage.clear();
        history.push('/login');
    }

    handleAccount = () => {
        this.setAnchorEl(null);
        history.push('/account-settings');
    }

    setAnchorEl = (value: any | null) => {
        this.setState({ anchorEl: value })
    }
    render() {
        const { username, anchorEl } = this.state;

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
                            <input type="text" className="navbar-search" placeholder="Search movie by title..." />
                        </nav>
                        <Box alignSelf="center" display="flex">
                            <div className="user-button" onClick={this.handleDropmenu}>
                                <SvgIcon component={AccountCircleIcon} />
                                <div>{username}</div>
                            </div>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleAccount}>My account</MenuItem>
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </div>
                </div>
                <Breadcrumbs className="Head__Breadcrumb Head__Breadcrumb--Active">
                    <Box display="flex" m="20px">
                        <Switch>
                            <Route exact path="/dashboard" render={() => <><SvgIcon width="20px" height="20px" component={HomeIcon} /><span>Dashboard</span></>} />
                            <Route exact path="/bookmarks" render={() => <><SvgIcon width="20px" height="20px" component={BookmarksIcon} /><span>Bookmarks</span></>} />
                            <Route exact path="/donations" render={() => <><SvgIcon width="20px" height="20px" component={MonetizationOnIcon} /><span>Donate</span></>} />
                        </Switch>
                    </Box>

                </Breadcrumbs>
            </>
        );
    }
}


export default Header