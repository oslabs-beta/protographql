import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function CodeContainer() {
  return (
    <main style={{flexgrow: 1}}>
      <CssBaseline />
      <Container style={{width: '100%', }} maxWidth='xl' >
        <Typography 
          paragraph
          style={{ backgroundColor: '#333333', height: '100vh', color: 'white', alignContent: 'center', width: '100%'}}
        >
           {
               "all code goes here {hello there!}kjdghsergedfmvejrskgnergwewrmhjftsretwragdfhgzfbzc"
           }
        </Typography>
      </Container>
    </main>
  );
}

export default CodeContainer;