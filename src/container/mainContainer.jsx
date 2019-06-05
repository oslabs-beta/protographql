import React, { useState } from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/navSideBar/navSidebar';
import Welcome from '../components/popup/welcome';
import * as state from '../state/initialState';
import * as mockState from '../state/mockState';


const Main = () => {

  //State constants instantiated using useState
    //Clean initial state
      /*
      const [selectedTable, setSelectedTable] = useState(state.selectedTableState);

      const [selectedField, setSelectedField] = useState(state.selectedFieldState);

      const [tableIndex, setTableIndex] = useState(state.tableIndexState);

      const [tables, setTables] = useState(state.tablesState);


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
    <div>
      <h1> Our cool ProtoGraphQL App </h1>
      
      {/* uncomment the components to test
      <Header />
      <NavSideBar />
      <Welcome />
      <NavSideBar /> */}
    </div>
  )
}


export default Main;