import React from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/navSideBar/navSidebar';
import Welcome from '../components/popup/welcome';
import MainView from '../components/view/mainView';

/* Comments
  SetView toggles the tab shown in the sandbox area
  potential tabs for MVP are code & schema, stretch would include GQL setup area
  setPopUp toggle popups
  potential popups are welcome, table details, and export (select folder to save & success)
*/

const Main = () => {

  //Rendered components and elements
  // can't use styled components here because of the gridTemplateAreas
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      gridTemplateRows: "65px auto",
      gridTemplateAreas: `
        "header header header header header header header"
        "navSideBar main main main main main main"`,
      height: "100vh",
      backgroundColor: "#EEEFF0",
      fontFamily: "'Roboto', sans-serif",
    }}>
      <Header />
      <Welcome />
      <NavSideBar />
      <MainView />
    </div>
  )
}

export default Main;
