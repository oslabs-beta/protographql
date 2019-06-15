import React, { useState } from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/navSideBar/navSidebar';
import Welcome from '../components/popup/welcome';
// import * as state from '../state/initialState';
import * as state from '../state/mockState';
import MainView from '../components/view/mainView';
import styled from 'styled-components';

/* Comments
  SetView toggles the tab shown in the sandbox area
  potential tabs for MVP are code & schema, stretch would include GQL setup area
  setPopUp toggle popups
  potential popups are welcome, table details, and export (select folder to save & success)
*/

/*-------------------- Styled Component --------------------*/

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
  const [selectedTable, setSelectedTable] = useState(state.selectedTableState);
  const [tableIndexState, setTableIndexState] = useState(state.tableIndexState);
  const [tables, setTables] = useState(state.tablesState);
  const [view, setView] = useState(state.viewState);
  const [popUp, setPopUp] = useState(state.popUpState);
  const initialTableState = state.initialTableState;
  const initialFieldState = state.initialFieldState;

  return (
    <Container>
      <Header />
      <Welcome setPopUp={setPopUp} popUp={popUp} />
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
        initialFieldState={initialFieldState}
      />
    </Container>
  )
}

export default Main;
