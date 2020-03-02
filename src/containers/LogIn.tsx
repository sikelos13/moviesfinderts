import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import Container, { ContainerProps } from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LogInIcon from '../images/login-in.png'
// import { Button } from '@material-ui/core';

interface LogInState {
    formIsValid: boolean;
    formErrorText: string;
    isReady: boolean;
    clickSignUp: boolean;
    form: {
        username: string;
        password: string;
    }
}

class LogIn extends Component<{}, LogInState> {
    constructor(props: any) {
        super(props)

        this.state = {
            formIsValid: true,
            formErrorText: "",
            isReady: false,
            clickSignUp: false,
            form: {
                username: "",
                password: "",
            }
        };
    }
    submitSignInForm = () => {
        const { form } = this.state;
        if (this.handleFormValidation(form)) {
            this.setState({ isReady: true })
        }
    }

    clearError = () => {
        this.setState({
            formIsValid: true,
            formErrorText: ""
        })
    }

    handleFormValidation = (form: any) => {
        const user: any = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        console.log(form)
        if (form.password === "" || form.username === "") {
            this.setState({
                formIsValid: false,
                formErrorText: "Please fill all the fields in you sign up form"
            })
            return false;
        } else if (form.password !== parsedUser.password) {
            this.setState({
                formIsValid: false,
                formErrorText: "Invalid password"
            })
            return false;
        } else if (form.username !== parsedUser.username) {
            this.setState({
                formIsValid: false,
                formErrorText: "Invalid username"
            })
            return false
        } else if (parsedUser && parsedUser.username === form.username && parsedUser.password === form.password) {
            return true;
        }
    }

    onChangeFormInput = (event: any) => {
        const { form } = this.state;
        const { name, value } = event.target;

        this.clearError();
        this.setState({
            form:
            {
                ...form,
                [name]: value
            }
        });
    }

    redirectToSignUp = () => {
        this.setState({ clickSignUp: true })
    }

    render() {
        const { formIsValid, formErrorText, isReady, clickSignUp } = this.state
        if (isReady) {
            return <Redirect to='/dashboard' />
        }
        if (clickSignUp) {
            return <Redirect to='/signup' />
        }
        return (
            <Box width="100%" height="720px" display="flex" justifyContent="center">
                <Box width="100%" display="flex" justifyContent="space-around" alignItems="center">
                    <Box alignSelf="flex-end">
                        <img src={LogInIcon} alt="" />
                    </Box>
                    <Box flexDirection="column" justifyContent="center" display="flex">
                        <h1 className="login-header">Please log in to continue</h1>
                        {!formIsValid &&
                            <>
                                <FormHelperText error={true}>{formErrorText}</FormHelperText>
                            </>
                        }
                        <FormControl>
                            <InputLabel htmlFor="my-input">Username</InputLabel>
                            <Input type="text" name="username" id="username" onChange={this.onChangeFormInput} />
                            <FormHelperText id="my-helper-text">We'll never share your username.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input type="password" name="password" id="password" onChange={this.onChangeFormInput} />
                            <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
                        </FormControl>
                        <Box textAlign="right">Forgot your password?</Box>
                        <button className="signin-button" onClick={this.submitSignInForm}><span className="signin-button-text">Log In</span></button>
                        <p className="dont-have-account">Don't have an account? <a href="" className="singin-button" onClick={this.redirectToSignUp}>Sign Up</a></p>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default LogIn;