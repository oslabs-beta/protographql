import React, { useState } from 'react';
import MyButton from './navButton';
import styled from 'styled-components';


const SideBar = styled.div`
  background-color: white;
  grid-area: navSideBar;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
  display: inline-block;
`

function NavSideBar({ setView, setPopUp }) {
  const buttons = () =>{
    let input = [];
    const views = ['Schema', 'Code', 'Export', 'Add Table'];
    for(let i = 0; i < 4; i++){
      input.push(
       <MyButton key={views[i]}/>
      )
    }
   return input;
  }

  return (
    <SideBar>
      {buttons()}
    </SideBar>
  )
}

export default NavSideBar;
