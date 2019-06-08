import React from 'react'
import styled from 'styled-components';
import TableHeader from './tableHeader';
import TableRow from './tableRow';

const Div = styled.div`
  border: 1px solid #161e26;
  border-radius: 3px;
  width: 1200px;
  height: 600px;
  margin: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

function TableForm() {
  return (
    <Div>
      <Table id='table'>
        <tbody>
          <TableHeader />
          <TableRow />
          <TableRow />
        </tbody>
      </Table>
    </Div>
  )
}


export default TableForm;