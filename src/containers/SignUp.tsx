import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Container, {ContainerProps} from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SignUpLogo from '../images/SignUpLogo.png'

class SignUp extends Component<{}> {
    // constructor(props: any) {
    //     super(props)

    //     this.state = initState();
    // }

    render() {
        // const { className } = this.props;
        // const {
        //     organization_id,
        //     organization_slug,
        //     organization_name,
        //     trackingIdAllowedPerOrgFeature,
        //     urls
        // } = this.state;

        return (
            <Container className="signUp-container">
                <Box display="flex" justifyContent="space-around" alignItems="center">
            <div>
                <img src={SignUpLogo} alt=""/>
            </div>
            <Box flexDirection="column" justifyContent="center" display="flex">
                <Box className="signup-header" textAlign="center" component="h1">LET’S GET STARTED!</Box>
                    <Box component="h3" textAlign="center">Create your moviefinder acount</Box>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Username</InputLabel>
                        <Input id="username"/>
                        <FormHelperText id="my-helper-text">We'll never share your username.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Password</InputLabel>
                        <Input type="password" id="username"/>
                        <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
                    </FormControl>
            </Box>
            </Box>
            </Container>
        );
    }
}


export default SignUp;