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
`;

function TableForm({
  setPopUp,
  setTables,
  setSelectedTable,
  selectedTable,
  tableIndexState,
  setTableIndexState
}) {
  //Creating Table Inputs (these are fields)
  const fieldInputs = [];
  const createTableInputs = () => {
    const fields = Object.keys(selectedTable.fields)
    for (let i = 0; i < fields.length; i++) {
      fieldInputs.push(<TableInput field={selectedTable.fields[i]} key={i} />)
    }
  }
  createTableInputs();

  const Button = styled.button`
  padding: 6px;
  font-size: 0.6em;
  margin: 5px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: white;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.12);
`;

  const CloseButton = styled.span`
  font-size: 1.3em;
  margin: 5px;
  padding: 5px;
  color: white;
  &:hover {
    color: #DD399C;
  }
`

  const Buttons = styled.span`
  float: right;
  margin-right: 5px;
`

  return (
    <Draggable handle="#header">
      <CustomTable>
        <TableHeader id="header" style={{ cursor: "move" }} setPopUp={setPopUp}>
          <Buttons>
            <Button>Add Fields</Button>
            <Button>Submit Table</Button>
            <CloseButton onClick={() => { setPopUp('') }}>
              <i class="far fa-times-circle"></i>
            </CloseButton>
          </Buttons>
        </TableHeader>
        <TableNameInput name={selectedTable.type} />
        <Table id='table' >
          <tbody>
            <TableField />
            {fieldInputs}
          </tbody>
        </Table>
      </CustomTable>
    </Draggable >
  )
}


export default TableForm;