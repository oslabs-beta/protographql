import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  background: #161e26;
  border-radius: '5px';
`;

const Th = styled.th`
  height: auto;
  width: 10%;
  margin: 0;
  font-size: 1.25em;
  // border: 1px solid black;
  border-collapse;
  color: white;
  padding: 10px;
`;

function TableRow(props) {
  return (
    <Div>
      <table>
        <tbody>
          <tr>
            <Th>Actions</Th>
            <Th>Field Name</Th>
            <Th>Type</Th>
            <Th>Default Value</Th>
            <Th>Primary Key</Th>
            <Th>Autoincrement</Th>
            <Th>Unique</Th>
            <Th>Required</Th>
            <Th>Multiple Values</Th>
            <Th>Foreign Keys</Th>
          </tr>
        </tbody>
      </table >
    </Div >
  )
}

export default TableRow;