import React, { useState } from 'react';
import NavButton from './navButton';
import styled from 'styled-components';


const SideBar = styled.div`
  background-color: white;
  grid-area: navSideBar;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
  display: inline-block;
`

function NavSideBar({ setView, setPopUp }) {
  const buttons = () => {
    let input = [];
    const views = ['Schema', 'Code', 'Export', 'Table'];
    const icons = ["fas fa-code-branch", "fas fa-code", "fas fa-file-download", "fas fa-plus-square"]
    views.forEach((text, i) => {
      input.push(
        <NavButton className={icons[i]} view={text} onClick={() => { setView(text.toLowerCase()) }} />
      )
    })
    return input;
  }

  return (
    <SideBar>
      {buttons()}
    </SideBar>
  )
}

export default NavSideBar;
