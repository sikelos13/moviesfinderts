import React, { Component, Fragment } from 'react';
// import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Header from '../components/Header'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import axios from 'axios';

interface AccountSettingsState {
    formIsValid: boolean;
    formErrorText: string;
    form: {
        username: string;
        password: string;
        verify_password: string;
    }
}


class Account extends Component<{}, AccountSettingsState> {
    constructor(props: any) {
        super(props)

        this.state = {
            formIsValid: true,
            formErrorText: "",
            form: {
                username: "",
                password: "",
                verify_password: ""
            }
        };
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

    clearError = () => {
        this.setState({
            formIsValid: true,
            formErrorText: ""
        })
    }

    saveSettings = () => {
        const { form } = this.state;
        const user: any = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        if (this.handleFormValidation(form)) {
             axios.put(`http://localhost:8000/api/v1/users/${parsedUser.id}`, { username: form.username, password: form.password },{withCredentials: true})
            .then((res: any) => {
              if(res.status == 200) {
                const data = {
                    username: res.data.username,
                    password: res.data.password,
                }
                console.log(res)
                localStorage.setItem(`isAuthorized`, JSON.stringify(true));
                localStorage.setItem('user', JSON.stringify(data));

              }
            })
        }
    }

    clearForm = () => {
        this.setState({
            form: {
                username: "",
                password: "",
                verify_password: ""
            }
        })
    }

    handleFormValidation = (form: any) => {
        if (form.username === "" || form.password === "" || form.verify_password === "") {
            this.setState({
                formIsValid: false,
                formErrorText: "Please fill all the fields in you account form"
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

    render() {
        const { formIsValid, formErrorText } = this.state

        return (
            <>
                <Header />
                <Container>
                    <Box width="100%" height="720px" display="flex" justifyContent="center">
                        <Box width="100%" display="flex" justifyContent="space-around" alignItems="center">
                            <Box flexDirection="column" justifyContent="center" display="flex">
                                <h1 className="account-header">Edit your account settings</h1>
                                {!formIsValid &&
                                    <>
                                        <FormHelperText error={true}>{formErrorText}</FormHelperText>
                                    </>
                                }
                                <FormControl className="form-field-account">
                                    <label className="account-label" htmlFor="my-input">New username</label>
                                    <Input type="text" name="username"  id="account-input-field" placeholder="Enter new username" disableUnderline={true} onChange={this.onChangeFormInput} />
                                </FormControl>
                                <FormControl className="form-field-account">
                                    <label className="account-label" htmlFor="my-input">New password</label>
                                    <Input type="password" name="password" id="account-input-field" placeholder="Enter new password" disableUnderline={true} onChange={this.onChangeFormInput} />
                                </FormControl>
                                <FormControl className="form-field-account">
                                    <label className="account-label" htmlFor="my-input">Verify Password</label>
                                    <Input type="password" name="verify_password" id="account-input-field" placeholder="Verify new password" disableUnderline={true} onChange={this.onChangeFormInput} />
                                </FormControl>
                                <button className="signup-button" onClick={this.saveSettings}><span className="account-button-text">Save</span></button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </>
        );
    }
}

export default Account;