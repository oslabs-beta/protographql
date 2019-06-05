import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
 } from '@material-ui/core';

import { Add, Share, Code, GetApp  } from '@material-ui/icons';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    buttons: {
        margin: 10
    },
    plusButton: {
        position: 'fixed',
        bottom: 20,
        left: 10,
        width: 190
    }
}));

const NavSideBar = () => {
    const classes = useStyles();

    return (
        <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />

        <Divider />

        <List>
            <ListItem button key="Schema" className={classes.buttons}>
                <ListItemIcon>
                    <Avatar>
                        <Share />
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary="Schema" />
            </ListItem>

            <Divider />

            <ListItem button key="Code" className={classes.buttons}>
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
    )
}

export default NavSideBar;