import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Header from '../components/Header'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

interface AccountSettingsState {
    formIsValid: boolean;
    formErrorText: string;
    accountUsername?: string;
    accountUpdated: boolean;
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
            accountUpdated: false,
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
            accountUpdated: false,
            formErrorText: ""
        })
    }

    saveSettings = () => {
        const { form } = this.state;
        const user: any = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);

        if (this.handleFormValidation(form)) {
            axios.put(`http://localhost:8000/api/v1/users/${parsedUser.id}`, { username: form.username, password: form.password }, { withCredentials: true })
                .then((res: any) => {
                    if (res.status === 200) {
                        console.log(res.data)
                        const data = {
                            id: res.data._id,
                            username: res.data.username,
                            password: res.data.password,
                        }
                        this.clearForm();
                        this.setState({ accountUsername: form.username, accountUpdated: true })
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
                accountUpdated: false,
                formIsValid: false,
                formErrorText: "Please fill all the fields in you account form"
            })
            return false;
        } else if (form.password !== form.verify_password) {
            this.setState({
                accountUpdated: false,
                formIsValid: false,
                formErrorText: "Passwords don't match"
            })
            return false;
        } else {
            return true
        }
    }

    render() {
        const { formIsValid, formErrorText, accountUsername, form, accountUpdated } = this.state

        return (
            <>
                <Header accountUsername={accountUsername!} />
                <Container>
                    <Box width="100%" height="720px" display="flex" justifyContent="center">
                        <Box width="100%" display="flex" justifyContent="space-around" alignItems="center">
                            <Box flexDirection="column" justifyContent="center" display="flex">
                                <h1 className="account-header">Edit your account settings</h1>
                                <FormControl className="form-field-account">
                                    <label className="account-label" htmlFor="my-input">New username</label>
                                    <Input
                                        type="text"
                                        name="username"
                                        className="account-input-field"
                                        placeholder="Enter new username"
                                        disableUnderline={true}
                                        value={form.username}
                                        onChange={this.onChangeFormInput} 
                                    />
                                </FormControl>
                                <FormControl className="form-field-account">
                                    <label className="account-label" htmlFor="my-input">New password</label>
                                    <Input
                                        type="password"
                                        name="password"
                                        className="account-input-field"
                                        placeholder="Enter new password"
                                        disableUnderline={true}
                                        value={form.password}
                                        onChange={this.onChangeFormInput} 
                                    />
                                </FormControl>
                                <FormControl className="form-field-account">
                                    <label className="account-label" htmlFor="my-input">Verify Password</label>
                                    <Input
                                        type="password"
                                        name="verify_password"
                                        className="account-input-field"
                                        placeholder="Verify new password"
                                        disableUnderline={true}
                                        value={form.verify_password}
                                        onChange={this.onChangeFormInput} 
                                    />
                                </FormControl>
                                {accountUpdated &&
                                    <>
                                        <Alert severity="success">Account setting updated successfully.</Alert>
                                    </>
                                }
                                {!formIsValid &&
                                    <>
                                        <Alert severity="error">{formErrorText}</Alert>
                                    </>
                                }
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