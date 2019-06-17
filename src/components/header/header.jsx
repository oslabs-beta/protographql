import React, { useContext } from 'react';
import { Store } from '../../state/store';
import { SET_POP_UP } from '../../actions/actionTypes';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import { isWhiteSpaceLike } from 'typescript';



/*-------------------- Styled components --------------------*/

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
  },
  button: {
    color: '#DD399C',
    backgroundColor: '#324353',
    border: '1px solid #DD399C',
    marginRight: '10px',
    "&:hover": {
      color: '#324353',
      backgroundColor: '#DD399C',
      transform: 'scale(1.01)',
    }
  }
}));

/*-------------------- Functional Component --------------------*/

function Header() {
  const classes = useStyles();
  const { state: { popUp }, dispatch } = useContext(Store);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} style={{ padding: '0px 8px' }} aria-label="Menu">
            <img src="../public/assets/pictures/ProtoGraphQLLogo.png" height="50" />
          </IconButton>
          <Typography variant="h3" className={classes.title}>
            <span>Proto</span>
            <span className={classes.pink}>GraphQL</span>
          </Typography>
          <Button color="inherit" className={classes.button} onClick={() => { dispatch({ type: SET_POP_UP, payload: 'welcome' }) }}>
            <i className="fas fa-file-alt fa-3x"></i>
          </Button>
          <Button color="inherit" className={classes.button}>
            <i className="fab fa-github fa-3x"></i>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
