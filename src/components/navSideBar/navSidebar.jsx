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
  const buttons = () =>{
    let input = [];
    const views = ['Schema', 'Code', 'Export', 'Add Table'];
    for(let i = 0; i < views.length; i++){
      input.push(
       <NavButton view={views[i]} onClick={()=>{setView(views[i].toLowerCase())}}/>
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


// function NavSideBar({ setView, setPopUp }) {
//   return (
//     <SideBar>
//       <ButtonContainer key="schema" onClick={() => {setView('schema')}}>
//         <Button>
//           <Icon ><i className="fas fa-code-branch"></i></Icon>
//           <Icon>Schema</Icon>
//         </Button>
//       </ButtonContainer>
//       <ButtonContainer key="code" onClick={() => {setView('code')}}>
//         <Button>
//           <Icon ><i className="fas fa-code"></i></Icon>
//           <Icon>Code</Icon>
//         </Button>
//       </ButtonContainer>
//       <ButtonContainer>
//         <Button>
//           <Icon ><i className="fas fa-file-download"></i></Icon>
//           <Icon>Export</Icon>
//         </Button>
//       </ButtonContainer>
//       <ButtonContainer >
//         <Button>
//           <Icon ><i className="fas fa-plus-square"></i></Icon>
//           <Icon>Add table</Icon>
//         </Button>
//       </ButtonContainer>
//     </SideBar>
//   )
// } 