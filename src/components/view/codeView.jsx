import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function CodeContainer() {
  return (
    <Fragment>
      <CssBaseline />
      <Container style={{marginLeft: '14.6%'}}>
        <Typography component="div" style={{ backgroundColor: '#333333', height: '100vh', color: 'white', alignContent: 'center'}}>
           {
               "all code goes here {hello there!}kjdghsergedfmvejrskgnergwewrmhjftsretwragdfhgzfbzc"
           }
        </Typography>
      </Container>
    </Fragment>
  );
}

export default CodeContainer;