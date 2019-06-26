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
import { SET_POP_UP } from '../../actions/actionTypes';
import buildSQLPool from '../../utils/buildSQLPool';

//comment out to use web-dev-server instead of electron
// const electron = window.require('electron');
// const ipc = electron.ipcRenderer;

/*-------------------- Styled components --------------------*/

const Title = styled(DialogTitle)({
  width: "500px",
  textAlign: "center",
  padding: '25px',
  color: 'white',
  background: '#161e26',
});

const StyledButton = styled(Button)({
  width: '200px',
  border: '1px solid #161e26',
  color: '#161e26',
  padding: '10px',
  margin: '10px'
});

const DialogActionsDiv = styled(DialogActions)({
  justifyContent: 'center',
  margin: 0,
});


/*-------------------- Functional Component --------------------*/

function ExportPopUp(props) {

  const { state: { popUp, gqlSchema, gqlResolvers, sqlScripts }, dispatch } = useContext(Store);

  const handleClose = () => {
    dispatch({ type: SET_POP_UP, payload: '' });
  }

  const keyUpToHandleClose = (e) => {
    if (e.keyCode === 27) {
      dispatch({ type: SET_POP_UP, payload: '' });
    }
  }

  return (
    <div onKeyUp={keyUpToHandleClose}>
      <Dialog open={popUp === 'export'}>
        <Title>E X P O R T </Title>

        <DialogActionsDiv>
          <form onSubmit={(e) => {
            e.preventDefault();
            const uri = e.target.childNodes[0].value.toLowerCase();
            if (uri.slice(0, 11) === 'postgres://' || uri.slice(0, 13) === 'postgresql://') {
              // emitting message to electron window to open save dialog
              ipc.send('show-export-dialog', gqlSchema, gqlResolvers, sqlScripts, buildSQLPool(uri));
            } else {
              //dispatch error snackbar 
            }
          }}>
            <input type="text" placeholder="Enter Postgres Connection URI" required />
            <br />
            <StyledButton type="submit" color="primary">Export</StyledButton>
            <StyledButton onClick={handleClose} color="primary">Close</StyledButton>
          </form>
        </DialogActionsDiv>

      </Dialog>
    </div >
  );
}

export default ExportPopUp;
