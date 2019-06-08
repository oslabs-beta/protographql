import React from 'react'
import styled from 'styled-components';
import TableHeader from './tableHeader';
import TableRow from './tableRow';
import Draggable from 'react-draggable';

const Div = styled.div`
  border: 1px solid #161e26;
  border-radius: 5px;
  width: 90%;
  height: 600px;
  margin: 20px;
  border-spacing: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

function TableForm() {

  return (
    <Draggable>
      <Div style={{ cursor: "move" }} >
        <Table id='table' >
          <tbody>
            <TableHeader />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
          </tbody>
        </Table>
      </Div>
    </Draggable>
  )
}


export default TableForm;