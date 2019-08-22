/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper
} from "@material-ui/core";
import Draggable from "react-draggable";
import { styled } from "@material-ui/styles";
import { Store } from '../../state/store';
import { SET_POP_UP } from '../../actions/actionTypes';

/*-------------------- Styled components --------------------*/

// styles the header of the dialog-box that appears when the application is first loaded
const Title = styled(DialogTitle)({
  width: "500px",
  textAlign: "center",
  padding: '25px',
  color: 'white',
  background: '#161e26',
});

// styles the {REST} and GraphQL logo of the dialog-box that appears when the application is first loaded
const Text = styled(DialogContentText)({
  color: "white",
  height: 'auto',
  width: '215px',
  margin: '15px',
  textAlign: "center",
  marginBottom: '7px',
});

// styles the definitions of the dialog-box that appears when the application is first loaded
const ContentDiv = styled(DialogContent)({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  width: '500px',
  color: '#161e26',
});

// styles the start button of the dialog-box that appears when the application is first loaded
const StartButton = styled(Button)({
  width: '200px',
  border: '1px solid #161e26',
  color: '#161e26',
  padding: '10px',
  marginTop: '0px',
  marginBottom: '10px'
});

/*
styles the space around the start button of the dialog-box that appears when the
application is first loaded
*/
const DialogActionsDiv = styled(DialogActions)({
  justifyContent: 'center',
  margin: 0
});

/*-------------------- Functional Component --------------------*/

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function DraggableDialog(props) {

  //USE CONTEXT
  const { state: { popUp }, dispatch } = useContext(Store);

  const handleClose = () => {
    dispatch({ type: SET_POP_UP, payload: '' });
  }

  const keyUpToHandleClose = (e) => {
    // condition that handles the 'Escape' and 'Enter' buttons on a keyboard
    if (e.keyCode == 13 || e.keyCode == 27) {
      /*
      invoke 'dispatch' when 'Escape' or 'Enter' is pressed and pass the object type of
      'SET_POP_UP' and a payload of ''
      */
      dispatch({ type: SET_POP_UP, payload: '' });
    }
  }

  //END OF USE CONTEXT

  return (
    <div onKeyUp={keyUpToHandleClose}>
      <Dialog open={popUp === 'welcome'} PaperComponent={PaperComponent}>
        <Title style={{ cursor: "move" }} id="draggable-dialog-title">P R O T O G R A P H Q L</Title>

        <ContentDiv>
          <Text>
            <img
              alt="restLogo"
              src="./public/assets/pictures/Rest-Logo.png"
              height="125px"
            />
          </Text>

          <Text>
            <img
              alt="graphQLLogo"
              src="./public/assets/pictures/GraphQL-Logo.png"
              height="125px"
            />
          </Text>
        </ContentDiv>

        <DialogActionsDiv>
          <StartButton onClick={handleClose} color="primary" >Start</StartButton>
        </DialogActionsDiv>

        <ContentDiv style={{ marginTop: "15px", marginBottom: "25px", textAlign: "left" }}>
          <ol>
            <li>Add Table - create tables that mimic psql tables</li>
            <li>Schema - view, edit, or delete table you add</li>
            <li>Code - view generated GraphQL and SQL code before export</li>
            <li>Visualize - view the GraphQL schema intuitively as a simple tree</li>
            <li>Export - export project to interact with database</li>
          </ol>
        </ContentDiv>
      </Dialog>
    </div >
  );
}

export default DraggableDialog;
