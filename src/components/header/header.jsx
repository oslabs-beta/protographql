import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 3,
    gridArea: "header",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
  },
  header: {
    backgroundColor: "#324353",
  },
  pink: {
    color: "#DD399C",
  }

}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} style={{ padding: '0px 8px' }} aria-label="Menu">
            {/* <img src="../public/assets/pictures/GraphQL_Logo.png" height="40" /> */}
            <img src="../public/assets/pictures/ProtoGraphQLLogo.png" height="50" />
          </IconButton>
          <Typography variant="h3" className={classes.title}>
            <span>Proto</span>
            <span className={classes.pink}>GraphQL</span>
          </Typography>
          <Button color="inherit">
            <a href="https://github.com/oslabs-beta/protographql">
              <img src="../public/assets/pictures/GitHub-Mark-Light-64px.png" height="40" />
            </a>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;