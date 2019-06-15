import React from 'react';
import NavButton from './navButton';
import styled from 'styled-components';
import deepClone from '../../utils/deepClone';

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

function NavSideBar({ 
  setView, 
  setPopUp, 
  setSelectedTable, 
  tableIndexState, 
  initialTableState 
}) {
  const buttons = () => {
    const input = [];
    const popUp = ['', '', '', 'table'];
    const views = ['Schema', 'Code', 'Export', 'Add Table'];
    const icons = ["fas fa-code-branch", "fas fa-code", "fas fa-file-download", "fas fa-plus-square"]
    const route = ['schema', 'code', 'export', 'schema'];
    views.forEach((text, i) => {
      const click = () => {

        setView(route[i]);
        setPopUp(popUp[i]);

        if (i !== 3) {
          const currentButton = document.querySelector(`#${views[i]}`);
          currentButton.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.10)";
          currentButton.style.border = "2px solid rgba(0, 0, 0, 0.12)";
          currentButton.style.borderRight = "4px solid rgba(221, 57, 156, 1)";
          for (let j = 0; j < views.length - 1; j++) {
            if (i !== j) {
              const button = document.querySelector(`#${views[j]}`);
              button.style.boxShadow = "1px 2px 3px rgba(0, 0, 0, 0.10)";
              button.style.border = "none";
              button.style.borderRight = "1px solid rgba(0, 0, 0, 0.12)";
            }
          }
        }

        if (i === 3) {
          const initialTableStateCopy = deepClone(initialTableState);
          initialTableStateCopy.tableID = tableIndexState;
          initialTableStateCopy.fields[1].tableNum = tableIndexState;
          setSelectedTable(initialTableStateCopy);
        }
      }
      if (i !== 3) input.push(
        <NavButton 
          key={i} 
          className={icons[i]} 
          view={text} 
          click={click} 
        />
      );
      else input.push(
        <NavButton 
          key={i} 
          className={icons[i]} 
          view={text} 
          click={click} 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            borderTop: '1px solid rgba(0, 0, 0, 0.08)', 
            width: '100%' 
          }} 
        />
      );

    });
    return input;
  }
  return (
    <SideBar>{buttons()}</SideBar>
  )
}

export default NavSideBar;
