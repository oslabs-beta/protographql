//These are the instructions

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

// styles the header of this dialog-box 
const Title = styled(DialogTitle)({
  width: "500px",
  textAlign: "center",
  padding: '25px',
  color: 'white',
  background: '#161e26',
});


// styles "ContentDiv"
const ContentDiv = styled(DialogContent)({
  textAlign: 'left',
  width: '500px',
  color: '#161e26',
});

// styles the "GotItButton"
const GotItButton = styled(Button)({
  width: '100px',
  border: '1px solid #161e26',
  // color: '#161e26',
  padding: '10px',
  marginTop: '0px',
  marginBottom: '10px',
  color: "rgba(221, 57, 156, 1)",
  fontFamily: "Roboto, sans-serif",
});

/*
styles the space around the GotItButton button
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
      <Dialog open={popUp === 'instructions'} PaperComponent={PaperComponent}>
        <Title style={{ cursor: "move" }} id="draggable-dialog-title">Instructions</Title>

        <ContentDiv style={{ marginTop: "15px", marginBottom: "25px", textAlign: "left" }}>
          <DialogContentText>1) Add the endpoint of your running GraphQL server in the "GraphQL Endpoint URL" box. Click the "Add URL" button</DialogContentText>
          <DialogContentText>2) If no valid endpoint is entered, the default endpoint will be set to http://localhost:3000/GraphQL  </DialogContentText>
          <DialogContentText>3) Type your test query in the box on the left.</DialogContentText>
          <DialogContentText>4) Click the "Add Query" button <br />(Repeat steps 2 and 3 to add additional query response pairs)</DialogContentText>
          <DialogContentText>5) To export your test file click the "Export Tests" button.</DialogContentText>
        </ContentDiv>
        <DialogActionsDiv>
          <GotItButton onClick={handleClose} color="primary">Got it!</GotItButton>
        </DialogActionsDiv>
      </Dialog>
    </div >
  );
}

export default DraggableDialog;
