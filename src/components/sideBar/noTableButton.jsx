import React from 'react';
import styled, { keyframes } from 'styled-components';

/*-------------------- Styled Components --------------------*/

// styles animation of the 'Add Table' button
const fontColor = keyframes`
  0% {
    color: rgba(50, 67, 83, 1);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.00);
    bottom: 0px;
  }
  50% {
    color: #e535ab;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.10);
    bottom: 25px;
  }
  100% {
    color: rgba(50, 67, 83, 1);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.00);
    bottom: 0px;
  }
`;

// styles the 'Add Table' button and surrounding space
const ButtonContainer = styled.div`
  padding: 1px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  min-width: 200px;
  cursor: pointer;
  animation: ${fontColor} 2s;
  animation-fill-mode: both;
  animation-iteration-count: 5;
`;

// styles the 'Add Table' button and surrounding space
const Button = styled.div`
  height: 60px;
  background-color: none;
  margin: auto;
  margin-left: calc(15.5px + .25vw);
  margin-top: 25px;
`;

// styles the icon associated with the 'Add Table' button
const Icon = styled.span`
  margin: 5px;
  font-size: calc(14px + 1vw);
`;

/*-------------------- Functional Component --------------------*/

const NoTableButton = ({ className, click, view, style }) => {
  return (
    <ButtonContainer style={style} onClick={click} id={view}>
      <Button>
        <Icon><i className={className} /></Icon>
        {view}
      </Button>
    </ButtonContainer>
  )
}

export default NoTableButton;
