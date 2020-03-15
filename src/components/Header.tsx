import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Box, Breadcrumbs, Menu, MenuItem } from '@material-ui/core';
import HeaderLogo from '../images/header-logo.png'
import { SvgIcon } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import history from '../history'

interface HeaderState {
    username: string;
    anchorEl?: any | null;
    isLoggedOut: boolean;
}

interface HeaderProps {
    accountUsername?: string;
}

class Header extends Component<HeaderProps, HeaderState> {
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

        this.setState({ username: parsedUser && parsedUser != null && parsedUser.username })
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
        history.push('/');
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
        const { accountUsername } = this.props;

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
                            </ul>
                        </nav>
                        <Box alignSelf="center" display="flex">
                            <div className="user-button" onClick={this.handleDropmenu}>
                                <SvgIcon component={AccountCircleIcon} />
                                <Box display="flex" alignItems="center" ml="5px">
                                    {accountUsername
                                        ? accountUsername
                                        : username
                                    }
                                </Box>
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
                        </Switch>
                    </Box>

                </Breadcrumbs>
            </>
        );
    }
}


export default Header