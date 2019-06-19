import React, { useContext } from 'react';
import NavButton from './navButton';
import styled from 'styled-components';
import { Store } from '../../state/store';
import { 
  SET_POP_UP,
  SET_VIEW,
  ADD_TABLE,
 } from '../../actions/actionTypes';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipc  = electron.ipcRenderer;

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

function NavSideBar() {

  const { dispatch } = useContext(Store);

    
  return (
    <SideBar>
      <NavButton 
          key='NavButton0' 
          className='fas fa-code-branch'
          view='Schema' 
          click={() => {
            dispatch({ type: SET_VIEW, payload: 'schema' })
            dispatch({ type: SET_POP_UP, payload: '' })
          }}
      />
      <NavButton 
          key='NavButton0' 
          className='fas fa-code'
          view='Code' 
          click={() => {
            dispatch({ type: SET_VIEW, payload: 'code' })
            dispatch({ type: SET_POP_UP, payload: '' })
          }}
      />
      <NavButton 
          key='NavButton0' 
          className='fas fa-file-download'
          view='Export' 
          click={() => {
            dispatch({ type: SET_VIEW, payload: 'export' })
            dispatch({ type: SET_POP_UP, payload: '' })
            ipc.send('show-export-dialog');
          }}
      />
      <NavButton 
          key='NavButton0' 
          className='fas fa-plus-square'
          view='Add Table' 
          click={() => {
            dispatch({ type: SET_VIEW, payload: 'schema' })
            dispatch({ type: SET_POP_UP, payload: 'table' })
            dispatch()
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
