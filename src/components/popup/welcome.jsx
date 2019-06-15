/* eslint-disable no-unused-vars */
import React from "react";
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

/*-------------------- Styled components --------------------*/

const Title = styled(DialogTitle)({
  width: "500px",
  textAlign: "center",
  padding: '25px',
  color: 'white',
  background: '#161e26',
});

const Text = styled(DialogContentText)({
  color: "white",
  height: 'auto',
  width: '215px',
  margin: '15px',
  textAlign: "center",
  marginBottom: '7px',
});

const ContentDiv = styled(DialogContent)({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  width: '500px',
  color: '#161e26',
});

const StartButton = styled(Button)({
  width: '200px',
  border: '1px solid #161e26',
  color: '#161e26',
  padding: '10px',
  marginTop: '0px',
  marginBottom: '10px'
});

const DialogActionsDiv = styled(DialogActions)({
  justifyContent: 'center',
  margin: 0,
});

/*-------------------- Functional Component --------------------*/

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function DraggableDialog({ popUp, setPopUp }) {
  const handleClose = () => {
    setPopUp('');
  }

  return (
    <div>
      <Dialog open={popUp === 'welcome'} PaperComponent={PaperComponent}>
        <Title style={{ cursor: "move" }} id="draggable-dialog-title">P R O T O G R A P H Q L</Title>

        <ContentDiv>
          <Text>
            <img
              alt="restLogo"
              src="../../../public/assets/pictures/Rest-Logo.png"
              height="125px"
            />
          </Text>

          <Text>
            <img
              alt="graphQLLogo"
              src="../../../public/assets/pictures/GraphQL-Logo.png"
              height="125px"
            />
          </Text>
        </ContentDiv>

        <DialogActionsDiv>
          <StartButton onClick={handleClose} color="primary" >Start</StartButton>
        </DialogActionsDiv>

        <ContentDiv style={{ marginTop: "15px", marginBottom: "25px" }}>
          Please prepare your credit card.
        </ContentDiv>
      </Dialog>
    </div>
  );
}

export default DraggableDialog;
