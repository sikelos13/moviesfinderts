import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import LogInIcon from '../images/login-in.png'
import axios from 'axios';
import history from "../history";

interface LogInState {
    formIsValid: boolean;
    formErrorText: string;
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
            form: {
                username: "",
                password: "",
            }
        };
    }
    submitSignInForm = () => {
        const { form } = this.state;

        if (this.handleFormValidation(form)) {
            axios.post(`http://localhost:8000/api/v1/account/login`, { username: form.username, password: form.password }, { withCredentials: true })
                .then((res: any) => {
                    if (res.status === 200) {
                        const data = {
                            username: res.data.username,
                            password: res.data.password,
                            id: res.data._id
                        }

                        localStorage.setItem(`isAuthorized`, JSON.stringify(true));
                        localStorage.setItem('user', JSON.stringify(data));
                        history.push('./dashboard');

                    }
                }).catch(err => {
                    this.setState({
                        formIsValid: false,
                        formErrorText: err.response.data.message
                })
        })
    }
}

    clearError = () => {
        this.setState({
            formIsValid: true,
            formErrorText: ""
        })
    }

    handleFormValidation = (form: any) => {

        if (form.password === "" || form.username === "") {
            this.setState({
                formIsValid: false,
                formErrorText: "Please fill all the fields in you sign up form"
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

    redirectToSignUp = () => {
        history.push('/signup');
    }

    render() {
        const { formIsValid, formErrorText } = this.state

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