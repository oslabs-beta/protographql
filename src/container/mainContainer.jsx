import React from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/sideBar/navSidebar';
import Welcome from '../components/popup/welcome';
import Instructions from '../components/popup/instructions';
import MainView from '../components/view/mainView';
import ExportPopUp from '../components/popup/exportPopUp';
import styled from 'styled-components';

/*-------------------- Styled Component --------------------*/

/*
styles the display area that appears after you exit the ReadME dialog-box that appears when you load the
application
*/
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 65px auto;
  grid-template-areas: 
    "header header header header header header header"
    "navSideBar main main main main main main";
  height: 100vh;
  background-color: #EEEFF0;
  font-family: "Roboto", sans-serif;
`;

/*-------------------- Functional Component --------------------*/

const Main = () => {

  return (
    <Container>
      <Header />
      <Welcome />
      <ExportPopUp />
      <NavSideBar />
      <MainView />
      <Instructions />
    </Container>
  )
}

export default Main;
