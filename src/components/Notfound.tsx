import React, { Component } from 'react';
import NotFoundLogo from '../images/notfound.png'
import { Container, Box } from '@material-ui/core';

class Notfound extends Component<{}> {

    render() {
        return (
            <>
                <Container>
                    <Box display="flex" justifyContent="center" alignContent="center" alignItems="center" flexDirection="column">
                    <h1 className="notfound-header"><span className="oops-header">Oops!</span>Page 404 not found.</h1>
                    <img src={NotFoundLogo} alt="" />
                </Box>
                </Container>
            </>
        );
    }
}

export default Notfound;