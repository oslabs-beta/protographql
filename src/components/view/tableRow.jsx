import React from 'react';
import styled from 'styled-components';

const Tr = styled.tr`
  border-bottom: 1px solid gray;
`;

const Td = styled.td`
  padding: 20px;
  font-size: 1em;
  text-align: center;
`;

function TableRow() {
  return (
    <Tr>
      <Td>---</Td>
      <Td>---</Td>
      <Td>---</Td>
      <Td>---</Td>
      <Td>---</Td>
      <Td>---</Td>
      <Td>---</Td>
      <Td>---</Td>
      <Td>---</Td>
    </Tr>
  )
}

export default TableRow;