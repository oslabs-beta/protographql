import React from 'react';
import styled from 'styled-components';

const Tr = styled.tr`
  background: #161e26;
  color: white;
  height: 60px;
`;

const Th = styled.th`
  font-size: 1.5em;
  padding: .5em;
`;


function TableHeader() {


  return (
    <Tr>
      <Th>Field Name</Th>
      <Th>Type</Th>
      <Th>Default Value</Th>
      <Th>Primary Key</Th>
      <Th>Auto Increment</Th>
      <Th>Unique</Th>
      <Th>Required</Th>
      <Th>Foreign Key</Th>
      <Th>Delete</Th>
    </Tr>

  )
}

export default TableHeader;