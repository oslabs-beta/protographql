import React from 'react';
import styled, { css, keyframes } from 'styled-components'

const fontColor = keyframes`
  to {
    color: #e535ab;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.10);
  }
`;

const SideBar = styled.div`
  background-color: white;
  grid-area: navSideBar;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
  display: inline-block;
`

const ButtonContainer = styled.div`
  padding: 0px;
  margin-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-right: 1px solid rgba(0, 0, 0, 0.08);
  min-width: 200px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.10);
  &:hover {
    animation: ${fontColor} .5s;
    animation-fill-mode: both;
  };
`

const Button = styled.div`
  height: 60px;
  background-color: none;
  margin: auto;
  width: 100%;
  margin-left: calc(15.5px + .25vw);
  margin-top: 25px;

`

const Icon = styled.span`
  margin: 5px;
  font-size: calc(14px + 1vw);
`

// color: #e535ab;

function NavSideBar ({ setView, setPopUp, view }) {
  return (
    <SideBar>
      <ButtonContainer key="schema" onClick={() => {setView('schema')}} view={view} >
        <Button>
          <Icon ><i class="fas fa-code-branch"></i></Icon>
          <Icon>Schema</Icon>
        </Button>
      </ButtonContainer>
      <ButtonContainer key="code" onClick={() => {setView('code')}}>
        <Button>
          <Icon ><i class="fas fa-code"></i></Icon>
          <Icon>Code</Icon>
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icon ><i class="fas fa-file-download"></i></Icon>
          <Icon>Export</Icon>
        </Button>
      </ButtonContainer>
      <ButtonContainer >
        <Button>
          <Icon ><i class="fas fa-plus-square"></i></Icon>
          <Icon>Add table</Icon>
        </Button>
      </ButtonContainer>
    </SideBar>
  )
}

export default NavSideBar;