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

const Input = styled(TextField)({
  margin: '0px',
  marginTop: '20px',
  width: 500,
})

/*-------------------- Functional Component --------------------*/

function ExportPopUp(props) {

  const { state: { popUp, gqlSchema, gqlResolvers, sqlScripts }, dispatch } = useContext(Store);

  const handleClose = () => {
    dispatch({ type: SET_POP_UP, payload: '' });
  }

  const keyUpToHandleClose = (e) => {
    if (e.keyCode === 27) {
      dispatch({ type: SET_POP_UP, payload: '' });
    } else if (e.keyCode === 13) {
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
              ipc.send('show-export-dialog', gqlSchema, gqlResolvers, sqlScripts, buildENV(uri));
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
