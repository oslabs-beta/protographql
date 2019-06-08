import React from 'react';
import styled from 'styled-components';

const Tr = styled.tr`
  background: #161e26;
  color: white;
  height: 45px;
`;

const Th = styled.th`
  font-size: .75em;
  padding: .25em;
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