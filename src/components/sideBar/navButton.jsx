import React from 'react';
import styled, { keyframes } from 'styled-components';

/*-------------------- Styled Components --------------------*/

// styles the 'Schema', 'Code', and 'Visualize' buttons
const fontColor = keyframes`
  to {
    color: #e535ab;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.10);
  }
`;

// styles the 'Schema', 'Code', and 'Visualize' buttons
const ButtonContainer = styled.div`
  padding: 1px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  min-width: 200px;
  cursor: pointer;
  &:hover {
    animation: ${fontColor} .5s;
    animation-fill-mode: both;
  };
`;

// styles the 'Schema', 'Code', and 'Visualize' buttons
const Button = styled.div`
  height: 60px;
  background-color: none;
  margin: auto;
  margin-left: calc(15.5px + .25vw);
  margin-top: 25px;
`;

// styles the 'Schema', 'Code', and 'Visualize' buttons
const Icon = styled.span`
  margin: 5px;
  font-size: calc(14px + 1vw);
`;

/*-------------------- Functional Component --------------------*/

const NavButton = ({ className, click, view, style }) => {
  return (
    <ButtonContainer style={style} onClick={click} id={view}>
      <Button>
        <Icon><i className={className} /></Icon>
        {view}
      </Button>
    </ButtonContainer>
  )
}

export default NavButton;
