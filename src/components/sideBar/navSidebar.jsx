import React, { useContext } from 'react';
import NavButton from './navButton';
import styled from 'styled-components';
import { Store } from '../../state/store';
import {
  SET_POP_UP,
  SET_VIEW,
  ADD_TABLE,
} from '../../actions/actionTypes';

//comment out to use web-dev-server instead of electron
// const electron = window.require('electron');
// const ipc = electron.ipcRenderer;

/*-------------------- Styled Components --------------------*/

const SideBar = styled.div`
  background-color: white;
  grid-area: navSideBar;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
  display: inline-block;
  height: calc(100vh - 64px);
  position: relative;
`;

/*-------------------- Functional Component --------------------*/

const views = ["Schema", "Code", "Visualize", "Export"]

function changeButtonStyleOnClick(view) {
  const currentButton = document.querySelector(`#${view}`);
  currentButton.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.10)";
  currentButton.style.border = "2px solid rgba(0, 0, 0, 0.12)";
  currentButton.style.borderRight = "4px solid rgba(221, 57, 156, 1)";
  for (let j = 0; j < views.length; j++) {
    if (view !== views[j]) {
      const button = document.querySelector(`#${views[j]}`);
      button.style.boxShadow = "1px 2px 3px rgba(0, 0, 0, 0.10)";
      button.style.border = "none";
      button.style.borderRight = "1px solid rgba(0, 0, 0, 0.12)";
    }
  }
}

function NavSideBar() {
  const {
    dispatch,
    state: {
      gqlSchema,
      gqlResolvers,
      sqlScripts,
    }
  } = useContext(Store);
  return (
    <SideBar>
      <NavButton
        key='NavButton0'
        className='fas fa-code-branch'
        view='Schema'
        click={(e) => {
          dispatch({ type: SET_VIEW, payload: 'schema' })
          dispatch({ type: SET_POP_UP, payload: '' })
          changeButtonStyleOnClick("Schema")
          document.querySelector("svg") ? document.querySelector("svg").remove() : "";
        }}
      />
      <NavButton
        key='NavButton1'
        className='fas fa-code'
        view='Code'
        click={(e) => {
          dispatch({ type: SET_VIEW, payload: 'code' })
          dispatch({ type: SET_POP_UP, payload: '' })
          changeButtonStyleOnClick("Code")
          document.querySelector("svg") ? document.querySelector("svg").remove() : "";
        }}
      />
      <NavButton 
        key='NavButton2' 
        className='fas fa-project-diagram'
        view='Visualize' 
        click={(e) => {
          dispatch({ type: SET_VIEW, payload: 'visualize' })
          dispatch({ type: SET_POP_UP, payload: '' })
          changeButtonStyleOnClick("Visualize")
          document.querySelector("svg") ? document.querySelector("svg").remove() : "";
        }}
      />
      <NavButton 
          key='NavButton3' 
          className='fas fa-file-download'
          view='Export' 
          click={(e) => {
            dispatch({ type: SET_VIEW, payload: 'export' })
            dispatch({ type: SET_POP_UP, payload: '' })
            changeButtonStyleOnClick("Export")
            document.querySelector("svg") ? document.querySelector("svg").remove() : "";
            //emitting message to electron window to open save dialog
            // ipc.send('show-export-dialog', gqlSchema, gqlResolvers, sqlScripts);
          }}
      />
      <NavButton 
          key='NavButton4' 
          className='fas fa-plus-square'
          view='Add Table' 
          click={() => {
            dispatch({ type: SET_VIEW, payload: 'schema' })
            dispatch({ type: SET_POP_UP, payload: 'table' })
            dispatch({ type: ADD_TABLE })
            document.querySelector("svg") ? document.querySelector("svg").remove() : "";
          }} 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            borderTop: '1px solid rgba(0, 0, 0, 0.08)', 
            width: '100%' 
          }}
        />
    </SideBar>
  )
}

export default NavSideBar;
