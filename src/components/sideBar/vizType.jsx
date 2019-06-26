import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

const fontColor = keyframes`
  to {
    color: #e535ab;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.10);
  }
`;

const ButtonContainer = styled.div`
  padding: 20px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  min-width: 200px;
  cursor: pointer;
  &:hover  {
    animation: ${fontColor} .5s;
    animation-fill-mode: both;
  };
`;

const TypeName = styled.div`
  font-weight: 450
  text-align: center;
  font-size: 1.2em;
  padding-bottom: 20px
`;

const Field = styled.div`
  margin-left: 20px;
  padding-bottom: 10px;

`;


function VizType ({ table }) {
  const values = []
  for (let key in table.fields) {
    values.push(<Field>{key}: {table.fields[key]}</Field>)
  }
  return (
    <ButtonContainer>
      <TypeName>{table.name}</TypeName>
      {values}
    </ButtonContainer>
  )
}

export default VizType