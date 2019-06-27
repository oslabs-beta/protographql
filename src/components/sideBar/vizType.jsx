import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

const fontColor = keyframes`
  to {
    color: #e535ab;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.10);
  }
`;

const ButtonContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  min-width: 200px;
  cursor: pointer;
  &:hover  {
    animation: ${fontColor} .5s;
    animation-fill-mode: both;
  };
`;

const TypeName = styled.div`
  margin-left: 20px;
  text-decoration: underline;
  font-weight: 450;
  text-align: left;
  font-size: 18px;
  padding-bottom: 20px;
`;

const Field = styled.div`
  margin-left: 20px;
  padding-bottom: 10px;
`;


function VizType ({ table }) {
  const values = []
  for (let key in table.fields) {
    values.push(<Field key={table+'-'+key}>{key}: {table.fields[key]}</Field>)
  }
  return (
    <ButtonContainer>
      <TypeName key="typeName">{table.name}</TypeName>
      {values}
    </ButtonContainer>
  )
}

export default VizType