// This is also the import button in the header
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Paper
} from "@material-ui/core";
import Draggable from "react-draggable";
import { styled } from "@material-ui/styles";
import { Store } from '../../state/store';
import { SET_POP_UP, IMPORT_TABLES } from '../../actions/actionTypes';
import buildENV from '../../utils/buildENV';
const electron = window.require('electron');
const ipc = electron.ipcRenderer;
// import { build } from "protobufjs";
/*-------------------- Styled components --------------------*/
// styles the header of the dialog-box that appears when the application is first loaded
const Title = styled(DialogTitle)({
  width: "500px",
  textAlign: "center",
  padding: '25px',
  color: 'white',
  background: '#161e26',
});
// styles the GraphQL logo of the dialog-box that appears when the application is first loaded
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
// styles the postgres database input field displayed after the import tables button is clicked
const DBinput = styled(Input)({
  lineHeight: '1.75px',
  borderRadius: '5px',
  margin: '0 6px 0 0',
  width: '300px',
  marginBottom: '10px',
  padding: '10px',
  color: '#dd399c',
  fontWeight: '400',
  border: '1px solid black',
  letterSpacing: '0.1em',
})
// styles the submit button for the postgres database input field
const Submit = styled(Button)({
  width: '100px',
  border: '1px solid #161e26',
  color: 'white',
  backgroundColor: 'rgba(221, 57, 156, 1)',
  padding: '10px',
  marginTop: '0',
  marginBottom: '10px',
})
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
  // USE CONTEXT
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
  // END OF USE CONTEXT
  // USE STATE to set visibility of postgres URI input field
  let [show, setShow] = useState({ display: "none" }); 
  // END OF USE STATE
  const setURI = (e) => {
    e.preventDefault();
    const URI = document.getElementById('dbInput').value;
    if (URI.slice(0, 11).toLowerCase() === 'postgres://' || URI.slice(0, 13).toLowerCase() === 'postgresql://') {
              // emitting message to electron window to open save dialog
              ipc.send('create-env-file', buildENV(URI));
              async function importTables() {
                const tables = {};
                ipc.on('tables-imported', (event, arg) => {
                  console.log("import tables, no async: ", arg)
                  dispatch({ type: IMPORT_TABLES, payload: arg})
                  dispatch({ type: SET_POP_UP, payload: '' })
                })
                ipc.send('import-tables', tables);
              }
              importTables();
            } else {
              console.log('That is not a valid input');
              // document.querySelector('#error').classList.remove('invisible')
            }
  }
  return (
    <div onKeyUp={keyUpToHandleClose}>
      <Dialog open={popUp === 'welcome'} PaperComponent={PaperComponent}>
        <Title style={{ cursor: "move" }} id="draggable-dialog-title">P R O T O G R A P H Q L</Title>
        <ContentDiv>
          <Text>
            <img
              alt="graphQLLogo"
              src="./public/assets/pictures/GraphQL-Logo.png"
              height="125px"
            />
          </Text>
          
          <ol style={{ marginTop: "15px", marginBottom: "25px", textAlign: "left", lineHeight: "1.3em"}}>
            <li>&#9674; Add Or Import Tables</li>
            <li>&#9674; Build Your Schema</li>
            <li>&#9674; Generate Your Code</li>
            <li>&#9674; Visualize Your Schema</li>
            <li>&#9674; Create Your Apollo Server</li>
            <li>&#9674; Test Your Queries</li>
            <li>&#9674; Export Your Tests</li>
          </ol>
        
        </ContentDiv>
        <DialogActionsDiv>
          <StartButton onClick={handleClose} color="primary" >Create Your Tables</StartButton>
          <StartButton onClick={() => setShow({ display: 'block' })} color="primary" >Import Tables</StartButton>
        </DialogActionsDiv>
        <div style={show}>
        <ContentDiv style={{ marginTop: "15px", marginBottom: "25px", textAlign: "center" }}>
        <DBinput id='dbInput' placeholder='Enter your database URI here'></DBinput>
        <Submit onClick={setURI}>Connect</Submit>
        </ContentDiv>
        </div>
      </Dialog>
      </div>
  );
}
export default DraggableDialog;