import React, { useContext } from 'react';
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
  grid-area: bar;
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

function VisualizerSideBar() {
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

    </SideBar>
  )
}

export default VisualizerSideBar;
