import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

/*
styles the content associated with the title 'Types' that appears in the right side-bar after
clicking the 'Visualize' button
*/
const fontColor = keyframes`
  to {
    color: #e535ab;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.10);
  }
`;

/*
styles the content associated with the title 'Types' that appears in the right side-bar after
clicking the 'Visualize' button
*/
const ButtonContainer = styled.div`
  font-size: 14px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  min-width: 200px;
  &:hover  {
    animation: ${fontColor} .5s;
    animation-fill-mode: both;
  };
`;

/*
styles the title of each type under the 'Types' title that appears in the right side-bar after clicking
the 'Visualize' button
*/
const TypeName = styled.div`
  margin-left: 20px;
  text-decoration: underline;
  font-weight: 450;
  text-align: left;
  padding-bottom: 20px;
`;

/*
styles the field of each type under the 'Types' title that appears in the right side-bar after clicking
the 'Visualize' button
*/
const Field = styled.div`
  margin-left: 20px;
  padding-bottom: 10px;
`;


function VizType ({ table }) {
  const values = []
  // iterate all fields in the table
  for (let key in table.fields) {
    /*
    append the respective field to the respective type cell under the 'Types' title that appears in the
    right side-bar after clicking the 'Visualize' button
    */
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