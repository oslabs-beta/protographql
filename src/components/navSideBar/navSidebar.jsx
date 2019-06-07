import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Grid,
 } from '@material-ui/core';

import { Add, Share, Code, GetApp,  } from '@material-ui/icons';

// const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    drawerPaper: {
      // width: drawerWidth,
    toolbar: theme.mixins.toolbar,
    buttons: {
        margin: 10
    }},
    plusButton: {
        position: 'fixed',
        bottom: 20,
        left: 10,
        width: 190
    },

    drawer: {
        [theme.breakpoints.up('sm')]: {
        // width: drawerWidth,
        flexShrink: 0,
      }
    }
}));

const NavSideBar = ({ setView, setPopUp }) => {
    const classes = useStyles();

    return (
      <Grid container>
        <Grid item lg={12}>
        <Drawer
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        >
        <List>
            <ListItem button key="Schema" className={classes.buttons} onClick={() => {setView('schema')}} anchor="left" >
                <ListItemIcon>
                    <Avatar>
                        <Share />
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary="Schema" />
            </ListItem>

            <Divider />

            <ListItem button key="Code" className={classes.buttons} onClick={() => {setView('code')}} >
                <ListItemIcon>
                    <Avatar>
                        <Code />
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary="Code" />
            </ListItem>

            <Divider />

            <ListItem button key="Export" className={classes.buttons}>
                <ListItemIcon>
                    <Avatar>
                        <GetApp />
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary="Export" />
            </ListItem>


        </List>
        <Divider />
        <List>
            <ListItem button
            key="AddNew"
            className={classes.plusButton}
            >
                <ListItemIcon>
                    <Avatar>
                        <Add />
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary="Add Table" />
            </ListItem>
        </List>
    </Drawer>
    </Grid>
  </Grid>
  )
}

export default NavSideBar;