import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const Tr = styled.tr`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

const Th = styled.th`
  font-size: .75em;
  padding: .9em;
`;


function TableField() {
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
      <Th>Queryable</Th>
      <Th>Foreign Key</Th>
    </Tr>
  )
}

export default TableField;