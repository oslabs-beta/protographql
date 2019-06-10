import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const Tr = styled.tr`
  background: rgba(50, 67, 83, 1);
  color: white;
`;

const Th = styled.th`
  font-size: .75em;
  padding: .9em;
`;


function TableHeader() {
  return (
    <Tr>
      <Th>Delete</Th>
      <Th>Field Name</Th>
      <Th>Type</Th>
      <Th>Default Value</Th>
      <Th>Primary Key</Th>
      <Th>Auto Increment</Th>
      <Th>Unique</Th>
      <Th>Required</Th>
      <Th>Foreign Key</Th>
    </Tr>
  )
}

export default TableHeader;