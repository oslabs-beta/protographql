import React from 'react'
import styled from 'styled-components';
import TableHeader from './tableHeader';
import TableRow from './tableRow';
import Draggable from 'react-draggable';
import TableName from './tableName';

const Div = styled.div`
  border: 1px solid #161e26;
  border-radius: 5px;
  width: 90%;
  height: auto;
  margin: 20px;
  border-spacing: 0;
  min-width: 450px;
  max-width: 1000px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

function TableForm({ setPopUp }) {
  return (
    // <Draggable>
    <Div>
      <TableName setPopUp={setPopUp} />
      <Table id='table' >
        <tbody>
          <TableHeader />
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </Table>
    </Div>
    // </Draggable>
  )
}


export default TableForm;