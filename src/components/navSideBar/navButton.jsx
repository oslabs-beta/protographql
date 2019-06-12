import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const fontColor = keyframes`
  to {
    color: #e535ab;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.10);
  }
`;

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

const Button = styled.div`
  height: 60px;
  background-color: none;
  margin: auto;
  width: 100%;
  margin-left: calc(15.5px + .25vw);
  margin-top: 25px;
`;

const Icon = styled.span`
  margin: 5px;
  font-size: calc(14px + 1vw);
`;

const NavButton = (props) => {
  return (
    <ButtonContainer onClick={props.click}>
      <Button>
        <Icon>
          <i className={props.className} />
        </Icon>
        {props.view}
      </Button>
    </ButtonContainer>
  )
}

export default NavButton;
