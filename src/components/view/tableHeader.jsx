import React from 'react';
import styled from 'styled-components';

const Tr = styled.tr`
  background: #161e26;
  color: white;
`;

const Th = styled.th`
  padding: 20px;
  font-size: 1em;
`;


function TableHeader() {


  return (
    <Tr>
      <Th>Actions</Th>
      <Th>Field Name</Th>
      <Th>Type</Th>
      <Th>Default Value</Th>
      <Th>Primary Key</Th>
      <Th>Autoincrement</Th>
      <Th>Unique</Th>
      <Th>Required</Th>
      <Th>Foreign Key</Th>
    </Tr>

  )
}

export default TableHeader;