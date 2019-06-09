import React, { useState } from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/navSideBar/navSidebar';
import Welcome from '../components/popup/welcome';
import TableDetailView from '../components/view/tableDetailView';
// import * as state from '../state/initialState';
import * as state from '../state/mockState';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MainView from '../components/view/mainView';
import { relative } from 'path';

//change to state for production

const Main = () => {
  //setView will change the tab shown in the sandbox
  //potential tabs for MVP are code & schema, stretch would include GQL setup area)
  //setPopup will toggle popups 
  //potential popups are welcome, table details, and export (select folder to save & success)
  const [selectedTable, setSelectedTable] = useState(state.selectedTableState);
  const [selectedField, setSelectedField] = useState(state.selectedFieldState);
  const [tableIndex, setTableIndex] = useState(state.tableIndexState);
  const [tables, setTables] = useState(state.tablesState);
  const [view, setView] = useState(state.viewState);
  const [popUp, setPopUp] = useState(state.popUpState);

  //Rendered components and elements
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      gridTemplateRows: "70px auto",
      gridTemplateAreas: `
          "header header header header header header header"
          "navSideBar main main main main main main"
        `,
      height: "100vh",
      backgroundColor: "white",
      fontFamily: "'Roboto', sans-serif"
    }}>
      <Header />
      <Welcome popUp={popUp} setPopUp={setPopUp} />
      <NavSideBar setView={setView} setPopUp={setPopUp} />
      <MainView
        view={view}
        tables={tables}
        setTables={setTables}
        setPopUp={setPopUp}
      />
    </div>
  )
}

export default Main;
