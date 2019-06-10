import React from 'react'
import styled from 'styled-components';
import TableHeader from './tableHeader';
import TableRow from './tableRow';
import Draggable from 'react-draggable';
import TableName from './tableName';

const Div = styled.div`
  border: 1px solid #161e26;
  border-radius: 5px;
  height: auto;
  min-width: 450px;
  margin-top: 200px;
  margin-right: 20px;
  box-shadow: 5px 10px;
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