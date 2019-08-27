/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Store } from '../../state/store';
import { SET_POP_UP, SET_VIEW } from '../../actions/actionTypes';
import buildENV from '../../utils/buildENV';
import TextField from '@material-ui/core/TextField';

//comment out to use web-dev-server instead of electron
const electron = window.require('electron');
const ipc = electron.ipcRenderer;

/*-------------------- Styled components --------------------*/

// styles the header of the Export button of the header of the application
const Title = styled(DialogTitle)({
  width: "500px",
  textAlign: "center",
  padding: '25px',
  color: 'white',
  background: '#161e26',
});

// styles the buttons of the Export button of the header of the application
const StyledButton = styled(Button)({
  width: '200px',
  border: '1px solid #161e26',
  color: '#161e26',
  padding: '10px',
  margin: '10px'
});

// styles the entire dialog box associated with the Export button of the header of the application
const DialogActionsDiv = styled(DialogActions)({
  justifyContent: 'center',
  margin: 0,
});

/*
styles the input field of the dialog box associated with the Export button of the header
of the application
*/
const Input = styled(TextField)({
  margin: '0px',
  marginTop: '20px',
  width: 500
})

/*-------------------- Functional Component --------------------*/

function ExportPopUp(props) {

  const { state: { popUp, gqlSchema, gqlResolvers, sqlScripts, queries }, dispatch } = useContext(Store);

  // this function is invoked on the 'Close' button on a click event, as defined on line 104 
  const handleClose = () => {
    dispatch({ type: SET_POP_UP, payload: '' });
  }

  // handles key commands to enable mouse-less / pad-less interaction with the application
  const keyUpToHandleClose = (e) => {
    // this condition is true when a user presses the 'Escape' button on a keyboad
    if (e.keyCode === 27) {
      /*
      invoke dispatch(), passing in a object type of 'SET_POP_UP' and a payload of '' to
      update the store
      */
      dispatch({ type: SET_POP_UP, payload: '' });
      // this condition is true when a user presses the 'Enter' button on a keyboad
    } else if (e.keyCode === 13) {
      // select the DOM element with an ID of 'export' and initiate a 'click' event on it
      document.querySelector('#export').click();
    }
  }

  return (
    <div onKeyUp={keyUpToHandleClose}>
      <Dialog open={popUp === 'export'}>
        <Title>E X P O R T
        </Title>
        <form
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          onSubmit={(e) => {
            e.preventDefault();
            const uri = e.target.childNodes[0].childNodes[1].childNodes[0].value;
            if (uri.slice(0, 11).toLowerCase() === 'postgres://' || uri.slice(0, 13).toLowerCase() === 'postgresql://') {
              // emitting message to electron window to open save dialog
              ipc.send('show-export-dialog', gqlSchema, gqlResolvers, sqlScripts, buildENV(uri), queries);
              dispatch({ type: SET_POP_UP, payload: '' });
            } else {
              document.querySelector('#error').classList.remove('invisible')
            }
          }}>
          <Input label="Enter Postgres Connection URI" margin="normal" type="text" required />
          <p className="invisible" id="error">URI needs to start with "postgres://" or "postgresql://"</p>
          <DialogActionsDiv>
            <StyledButton id="export" type="submit" color="primary">Export</StyledButton>
            <StyledButton onClick={handleClose} color="primary">Close</StyledButton>
          </DialogActionsDiv>
        </form>
      </Dialog>
    </div >
  );
}

export default ExportPopUp;
