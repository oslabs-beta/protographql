import React from 'react';
import styled, { css } from 'styled-components'

const SideBar = styled.div`
  grid-area: navSideBar;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
`

const ButtonContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`

const Button = styled.div`
  height: 60px;
  background-color: none;
  margin: auto;
  width: 100%;
  margin-left: 30px;
  margin-top: 25px;
`

const Icon = styled.span`
  margin: 5px;
  font-size: 20px;
`

function NavSideBar({ setView, setPopUp }) {
  return (
    <SideBar>
      <ButtonContainer>
        <Button>
          <Icon ><i className="fas fa-code-branch"></i></Icon>
          <Icon>Schema</Icon>
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icon ><i className="fas fa-code"></i></Icon>
          <Icon>Code</Icon>
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icon ><i className="fas fa-file-download"></i></Icon>
          <Icon>Export</Icon>
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icon ><i className="fas fa-plus-square"></i></Icon>
          <Icon>Add table</Icon>
        </Button>
      </ButtonContainer>
    </SideBar>
  )
}

// const NavSideBar = ({ setView, setPopUp }) => {
//     const classes = useStyles();

//     return (
//       <Grid container>
//         <Grid item sm={1}>
//           <div />
//         </Grid>
//         <Grid item lg={11}>
//         <Drawer
//         variant="permanent"
//         classes={{ paper: classes.drawerPaper }}
//         >
//         <List anchor="right">
//             <ListItem button key="Schema" className={classes.buttons} onClick={() => {setView('schema')}} >
//                 <ListItemIcon>
//                     <Avatar>
//                         <Share />
//                     </Avatar>
//                 </ListItemIcon>
//                 <ListItemText primary="Schema" />
//             </ListItem>

//             <Divider />

//             <ListItem button key="Code" className={classes.buttons} onClick={() => {setView('code')}} >
//                 <ListItemIcon>
//                     <Avatar>
//                         <Code />
//                     </Avatar>
//                 </ListItemIcon>
//                 <ListItemText primary="Code" />
//             </ListItem>

//             <Divider />

//             <ListItem button key="Export" className={classes.buttons}>
//                 <ListItemIcon>
//                     <Avatar>
//                         <GetApp />
//                     </Avatar>
//                 </ListItemIcon>
//                 <ListItemText primary="Export" />
//             </ListItem>


//         </List>
//         <Divider />
//         <List>
//             <ListItem button
//             key="AddNew"
//             className={classes.plusButton}
//             >
//                 <ListItemIcon>
//                     <Avatar>
//                         <Add />
//                     </Avatar>
//                 </ListItemIcon>
//                 <ListItemText primary="Add Table" />
//             </ListItem>
//         </List>
//     </Drawer>
//     </Grid>
//   </Grid>
//   )
// }

export default NavSideBar;