import React, { useState } from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/navSideBar/navSidebar';
import Welcome from '../components/popup/welcome';
import TableDetailView from '../components/view/tableDetailView';
import * as state from '../state/initialState';
import * as mockState from '../state/mockState';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MainView from '../components/view/mainView';
import TableForm from '../components/view/tableForm'
import { relative } from 'path';


const Main = () => {

  //State constants instantiated using useState
  //Clean initial state
  /*
  const [selectedTable, setSelectedTable] = useState(state.selectedTableState);

  const [selectedField, setSelectedField] = useState(state.selectedFieldState);

  const [tableIndex, setTableIndex] = useState(state.tableIndexState);

  const [tables,setTables] = useState(state.tablesState);


  const [view, setView] = useState(state.viewState);


  const [popUp, setPopUp] = useState(state.popUpState);

  */

  //currently pointing to mock state data
  const [selectedTable, setSelectedTable] = useState(mockState.selectedTableState);

  const [selectedField, setSelectedField] = useState(mockState.selectedFieldState);

  const [tableIndex, setTableIndex] = useState(mockState.tableIndexState);

  const [tables, setTables] = useState(mockState.tablesState);

  //this will toggle the tab shown in the sandbox area
  //potential tabs for MVP are code & schema, stretch would include GQL setup area
  const [view, setView] = useState(mockState.viewState);

  //this will toggle popups
  //potential popups are welcome, table details, and export (select folder to save & success)
  const [popUp, setPopUp] = useState(mockState.popUpState);

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
      <Header/>
      {/* <Welcome popUp={popUp} setPopUp={setPopUp} /> */}
      <NavSideBar setView={setView} setPopUp={setPopUp} view={view} />
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
