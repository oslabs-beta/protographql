import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { styled } from "@material-ui/styles";

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
  // border: '1px solid black',
});

const ContentDiv = styled(DialogContent)({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  width: '500px',
  color: '#161e26',
  // border: '1px solid black',
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

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function DraggableDialog( { popUp, setPopUp }) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setPopUp('');

  return (
    <div>
      <Dialog open={() => {return popUp === 'welcome'}} PaperComponent={PaperComponent}>
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
          <StartButton onClick={handleClose} color="primary">Start</StartButton>
        </DialogActionsDiv>

        <ContentDiv style={{ marginTop: "15px", marginBottom: "25px" }}>
          Lorem ipsum dolor amet tousled listicle VHS, hammock blog adaptogen
          prism jianbing offal viral lyft echo park 3 wolf moon. Freegan wolf
          meh cardigan fingerstache paleo. Drinking vinegar vaporware 90's
          knausgaard, pok pok subway tile flexitarian ethical kombucha
          kickstarter. Hell of slow-carb semiotics yr you probably haven't heard
          of them keffiyeh lyft iceland chicharrones. Authentic pinterest offal,
          microdosing blog taiyaki schlitz meditation literally. Hella echo park
          butcher normcore, ugh mumblecore helvetica pinterest art party
          scenester retro. Sartorial street art palo santo.
        </ContentDiv>
      </Dialog>
    </div>
  );
}

export default DraggableDialog;
