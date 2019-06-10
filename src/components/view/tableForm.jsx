import React from 'react'
import styled from 'styled-components';
import TableHeader from './tableHeader';
import TableRow from './tableRow';
import TableName from './tableName';

const CustomTable = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.14);
  height: auto;
  margin: 0 auto;
  min-width: 550px;
  max-width: 1000px;
  position: relative;
  top: calc(100% - 64px - 268px);
  background-color: white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.12);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

function TableForm({ setPopUp }) {
  return (
    // <Draggable>
    <CustomTable>
      <TableName setPopUp={setPopUp} />
      <Table id='table' >
        <tbody>
          <TableHeader />
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </Table>
    </CustomTable>
  )
}


export default TableForm;