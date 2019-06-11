import React, { useState } from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/navSideBar/navSidebar';
import Welcome from '../components/popup/welcome';
import TableDetailView from '../components/view/tableDetailView';
import * as state from '../state/initialState';
// import * as state from '../state/mockState';
import MainView from '../components/view/mainView';
import { relative } from 'path';

/* Comments
  SetView toggles the tab shown in the sandbox area
  potential tabs for MVP are code & schema, stretch would include GQL setup area
  setPopUp toggle popups
  potential popups are welcome, table details, and export (select folder to save & success)
*/

const Main = () => {
  const [selectedTable, setSelectedTable] = useState(state.selectedTableState);
  const [selectedField, setSelectedField] = useState(state.selectedFieldState);
  const [tableIndexState, setTableIndexState] = useState(state.tableIndexState);
  const [tables, setTables] = useState(state.tablesState);
  const [view, setView] = useState(state.viewState);
  const [popUp, setPopUp] = useState(state.popUpState);
  const initialTableState = state.initialTableState;

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
      <Welcome
      // never have been used
      //popUp={popUp} setPopUp={setPopUp}
      />
      <NavSideBar
        setView={setView}
        setPopUp={setPopUp}
        setSelectedTable={setSelectedTable}
        tableIndexState={tableIndexState}
        initialTableState={initialTableState}
      />
      <MainView
        view={view}
        tables={tables}
        setTables={setTables}
        setPopUp={setPopUp}
        setView={setView}
        popUp={popUp}
        setSelectedTable={setSelectedTable}
        selectedTable={selectedTable}
        tableIndexState={tableIndexState}
        setTableIndexState={setTableIndexState}
        initialTableState={initialTableState}
      />
    </div>
  )
}

export default Main;
