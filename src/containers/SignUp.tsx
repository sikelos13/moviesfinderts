import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Container, { ContainerProps } from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SignUpLogo from '../images/signup-1.png'
import { Button } from '@material-ui/core';

interface SignUpState {
    formIsValid: boolean;
    formErrorText: string;
    isReady: boolean;
    form: {
        username: string;
        password: string;
        verify_password: string;
    }
}

class SignUp extends Component<{}, SignUpState> {
    constructor(props: any) {
        super(props)

        this.state = {
            formIsValid: true,
            formErrorText: "",
            isReady: false,
            form: {
                username: "",
                password: "",
                verify_password: ""
            }
        };
    }
    submitSignUpForm = () => {
        const { form } = this.state;
        if (this.handleFormValidation(form)) {
            localStorage.setItem('user', JSON.stringify(form));
            localStorage.setItem(`isAuthorized`, JSON.stringify(true));

            this.setState({isReady: true})
        }
    }

    clearError = () => {
        this.setState({
            formIsValid: true,
            formErrorText: ""
        })
    }
    handleFormValidation = (form: any) => {
        if (form.username === "" || form.password === "" || form.verify_password === "") {
            this.setState({
                formIsValid: false,
                formErrorText: "Please fill all the fields in you sign up form"
            })
            return false;
        } else if (form.password !== form.verify_password) {
            this.setState({
                formIsValid: false,
                formErrorText: "Passwords don't match"
            })
            return false;
        } else {
            return true
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

    render() {
        const { formIsValid, formErrorText,isReady } = this.state
        if(isReady) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Box width="100%" height="720px" display="flex" justifyContent="center">
                <Box width="100%" display="flex" justifyContent="space-around" alignItems="center">
                    <Box alignSelf="flex-end">
                        <img src={SignUpLogo} alt="" />
                    </Box>
                    <Box flexDirection="column" justifyContent="center" display="flex">
                        <h1 className="signup-header">LET’S GET STARTED!</h1>
                        <Box component="h3" textAlign="center">Create your moviefinder acount</Box>
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
                        <FormControl>
                            <InputLabel htmlFor="my-input">Verify Password</InputLabel>
                            <Input type="password" name="verify_password" id="verify_password" onChange={this.onChangeFormInput} />
                            <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
                        </FormControl>
                        <button className="signup-button" onClick={this.submitSignUpForm}><span className="signup-button-text">Sign Up</span></button>
                        <p className="already-signup">Do you have an account? <a href="" className="singin-button">Sign in</a></p>
                    </Box>
                </Box>
            </Box>
        );
    }
}


export default SignUp;