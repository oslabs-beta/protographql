import React from 'react'
import styled from 'styled-components';
import TableNameInput from './tableNameInput';
import TableField from './tableField';
import TableInput from './tableInput';
import Draggable from 'react-draggable';

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


const TableHeader = styled.div`
    height: 30px;
    width: 100%;
    background: rgba(50,67,83,1);
}
`;

function TableForm({ setPopUp }) {
  return (
    <Draggable>
      <CustomTable>
        <TableHeader />
        <TableNameInput setPopUp={setPopUp} />
        <Table id='table' >
          <tbody>
            <TableField />
            <TableInput />
            <TableInput />
            <TableInput />
          </tbody>
        </Table>
      </CustomTable>
    </Draggable>
  )
}


export default TableForm;