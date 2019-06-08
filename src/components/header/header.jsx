import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 3,
    gridArea: 'header'
},
menuButton: {
    marginRight: theme.spacing(2),
},
title: {
    flexGrow: 2,
},
header:{
    backgroundColor : "rgb(22, 30, 38)"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="Menu">
           <img src='../public/assets/pictures/icon.png' height='40'/>
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            ProtoGraphQL
          </Typography>
          <Button color="inherit">
          <img src='../public/assets/pictures/GitHub-Mark-Light-64px.png' height='40'/>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}