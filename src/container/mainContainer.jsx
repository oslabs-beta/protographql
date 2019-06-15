import React, { useState } from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/navSideBar/navSidebar';
import Welcome from '../components/popup/welcome';
// import * as state from '../state/initialState';
import * as state from '../state/mockState';
import MainView from '../components/view/mainView';
import { Store } from '../state/store';

/* Comments
  SetView toggles the tab shown in the sandbox area
  potential tabs for MVP are code & schema, stretch would include GQL setup area
  setPopUp toggle popups
  potential popups are welcome, table details, and export (select folder to save & success)
*/

const Main = (props) => {

  const { state } = React.useContext(Store);
  const [selectedTable, setSelectedTable] = useState(state.selectedTable);
  const [tableIndexState, setTableIndexState] = useState(state.tableIndex);
  const [tables, setTables] = useState(state.tables);
  const [view, setView] = useState(state.view);
  const [popUp, setPopUp] = useState(state.popUp);
  const initialTable = state.initialTable;
  const initialField = state.initialField;

  console.log('Props in main: ', state);

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
        initialTable={initialTable}
        initialField={initialField}
      />
    </div>
  )
}

export default Main;
